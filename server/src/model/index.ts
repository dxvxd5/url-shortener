import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { Dynamode, TableManager } from 'dynamode';
import attribute from 'dynamode/decorators';
import Entity from 'dynamode/entity';
import { cleanEnv, str } from 'envalid';

const {
  DYNAMODB_URL_TABLE_NAME,
  DYNAMODB_ACCESS_KEY_ID,
  DYNAMODB_REGION,
  DYNAMODB_SECRET_ACCESS_KEY,
} = cleanEnv(process.env, {
  DYNAMODB_URL_TABLE_NAME: str(),
  DYNAMODB_ACCESS_KEY_ID: str(),
  DYNAMODB_SECRET_ACCESS_KEY: str(),
  DYNAMODB_REGION: str(),
});

interface UrlData {
  shortUrl: string;
  baseUrl: string;
  createdAt: Date;
  lastAccessedAt: Date;
}

export class Url extends Entity {
  @attribute.partitionKey.string()
  shortUrl: string;

  @attribute.string()
  baseUrl: string;

  @attribute.date.number()
  createdAt: Date;

  @attribute.date.number()
  lastAccessedAt: Date;

  constructor({ shortUrl, baseUrl, createdAt, lastAccessedAt }: UrlData) {
    super();

    this.shortUrl = shortUrl;
    this.baseUrl = baseUrl;
    this.createdAt = createdAt;
    this.lastAccessedAt = lastAccessedAt;
  }
}

const dynamoDb = new DynamoDB({
  region: DYNAMODB_REGION,
  credentials: {
    accessKeyId: DYNAMODB_ACCESS_KEY_ID,
    secretAccessKey: DYNAMODB_SECRET_ACCESS_KEY,
  },
});

Dynamode.ddb.set(dynamoDb);

const UrlTableManager = new TableManager(Url, {
  tableName: DYNAMODB_URL_TABLE_NAME,
  partitionKey: 'shortUrl',
  createdAt: 'createdAt',
});

export const urlManager = UrlTableManager.entityManager();
