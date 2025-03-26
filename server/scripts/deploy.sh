#!/bin/zsh

# Load environment variables from .env file
if [ -f .env ]; then
    source .env
else
    echo "Error: .env file not found."
    exit 1
fi

# Initialize flags
SKIP_BUILD=false
SKIP_LOGIN=false
SKIP_TAG=false
SKIP_PUSH=false
SKIP_DEPLOY=false

# Parse command-line arguments
for arg in "$@"; do
    case $arg in
        --skip-build)
            SKIP_BUILD=true
            shift
            ;;
        --skip-login)
            SKIP_LOGIN=true
            shift
            ;;
        --skip-tag)
            SKIP_TAG=true
            shift
            ;;
        --skip-push)
            SKIP_PUSH=true
            shift
            ;;
        --skip-deploy)
            SKIP_DEPLOY=true
            shift
            ;;
    esac
done

# Function to build the Docker image
build_image() {
    if [ "$SKIP_BUILD" = false ]; then
        echo "Building Docker image..."
        if ! docker build --platform $PLATFORM -t "$IMAGE_NAME" .; then
            echo "Error: Docker build failed."
            exit 1
        fi
    else
        echo "Skipping Docker image build."
    fi
}

# Function to authenticate Docker to ECR
login_to_ecr() {
    if [ "$SKIP_LOGIN" = false ]; then
        echo "Logging in to Amazon ECR..."
        if ! aws ecr get-login-password --region "$REGION" | docker login --username AWS --password-stdin "$ECR_URI"; then
            echo "Error: ECR login failed."
            exit 1
        fi
    else
        echo "Skipping ECR login."
    fi
}

# Function to tag the Docker image
tag_image() {
    if [ "$SKIP_TAG" = false ]; then
        echo "Tagging Docker image..."
        if ! docker tag "$IMAGE_NAME" "$ECR_URI/$REPOSITORY_NAME"; then
            echo "Error: Docker tagging failed."
            exit 1
        fi
    else
        echo "Skipping Docker image tagging."
    fi
}

# Function to push the Docker image to ECR
push_image() {
    if [ "$SKIP_PUSH" = false ]; then
        echo "Pushing Docker image to ECR..."
        if ! docker push "${ECR_URI}/${REPOSITORY_NAME}"; then
            echo "Error: Docker push failed."
            exit 1
        fi
    else
        echo "Skipping Docker image push."
    fi
}

# Function to register a new task definition
register_task_definition() {
    echo "Registering new task definition..."
    
    # Create the JSON for the task definition with logging configuration
    TASK_DEFINITION_JSON=$(cat <<EOF
{
    "family": "$TASK_FAMILY",
    "taskRoleArn": "$EXECUTION_ROLE_ARN",
    "executionRoleArn": "$EXECUTION_ROLE_ARN",
    "networkMode": "awsvpc",
    "containerDefinitions": [
        {
            "name": "$REPOSITORY_NAME",
            "image": "${ECR_URI}/${REPOSITORY_NAME}:latest",
            "cpu": $CPU,
            "memory": $MEMORY,
            "essential": true,
            "portMappings": [
                {
                    "name": "$PORT_MAPPING_NAME",
                    "containerPort": $CONTAINER_PORT,
                    "hostPort": $HOST_PORT,
                    "protocol": "tcp",
                    "appProtocol": "$APP_PROTOCOL"
                }
            ],
            "environment": [],
            "logConfiguration": {
                "logDriver": "awslogs",
                "options": {
                    "awslogs-group": "/ecs/${TASK_FAMILY}",
                    "mode": "non-blocking",
                    "awslogs-create-group": "true",
                    "max-buffer-size": "25m",
                    "awslogs-region": "$REGION",
                    "awslogs-stream-prefix": "ecs"
                }
            }
        }
    ],
    "requiresCompatibilities": [
        "FARGATE"
    ],
    "cpu": "$CPU",
    "memory": "$MEMORY"
}
EOF
)

    # Register the new task definition and capture the output
    OUTPUT=$(aws ecs register-task-definition --cli-input-json "$TASK_DEFINITION_JSON")
    
    if [ $? -ne 0 ]; then
        echo "Error: Failed to register task definition."
        exit 1
    fi

    # Extract the task definition ARN and revision number
    TASK_DEFINITION_ARN=$(echo "$OUTPUT" | jq -r '.taskDefinition.taskDefinitionArn')
    TASK_DEFINITION_REVISION=$(echo "$OUTPUT" | jq -r '.taskDefinition.revision')

    # Display the important information for the new task definition
    echo "New task definition registered: task definition $TASK_DEFINITION_ARN, version $TASK_DEFINITION_REVISION"

    # Deregister the previous task definition revision
    deregister_previous_task_definition
}

# Function to deregister the previous task definition revision
deregister_previous_task_definition() {
    # Get the previous revision number
    PREVIOUS_REVISION=$((TASK_DEFINITION_REVISION - 1))
    PREVIOUS_TASK_DEFINITION="${TASK_FAMILY}:${PREVIOUS_REVISION}"

    echo "Unregistering previous task definition: $PREVIOUS_TASK_DEFINITION..."
    
    # Capture the output of the deregister command
    DEREGISTER_OUTPUT=$(aws ecs deregister-task-definition --task-definition "$PREVIOUS_TASK_DEFINITION")
    
    if [ $? -ne 0 ]; then
        echo "Error: Failed to deregister previous task definition."
        exit 1
    fi
    
    echo "Previous task definition $PREVIOUS_TASK_DEFINITION deregistered."
}

# Function to update the ECS service
update_service() {
    echo "Updating ECS service to trigger redeployment..."
    
    # Update the ECS service with the new task definition revision and capture the output
    UPDATE_OUTPUT=$(aws ecs update-service --cluster "$CLUSTER_NAME" --service "$SERVICE_NAME" --task-definition "$TASK_DEFINITION_ARN" --force-new-deployment)
    
    if [ $? -ne 0 ]; then
        echo "Error: Failed to update ECS service."
        exit 1
    fi

    # Extract the service ARN and status
    SERVICE_ARN=$(echo "$UPDATE_OUTPUT" | jq -r '.service.serviceArn')
    SERVICE_STATUS=$(echo "$UPDATE_OUTPUT" | jq -r '.service.status')

    # Display the important information for the service update
    echo "Service updated: ARN $SERVICE_ARN, status $SERVICE_STATUS"
}

# Main execution flow
build_image
login_to_ecr
tag_image
push_image

if [ "$SKIP_DEPLOY" = false ]; then
    register_task_definition
    update_service
else
    echo "Skipping ECS service redeployment."
fi

echo "Deployment complete."
