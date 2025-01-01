export interface DynamodeNotFoundError extends Error {
  name: 'NotFoundError';
}

export const isDynamodeNotFoundError = (
  error: unknown
): error is DynamodeNotFoundError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'name' in error &&
    error.name === 'NotFoundError'
  );
};
