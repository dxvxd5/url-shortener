import type { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      pathAfterAuthority?: string;
    }
  }
}
