import type { NextFunction, Request, Response } from 'express';

// Middleware to capture the immediate path after authority
export const capturePathAfterAuthority = (
  req: Request,
  _: Response,
  next: NextFunction
): void => {
  // Remove the scheme and host from the full URL
  const pathAfterAuthority = req.originalUrl.split('?')[0]; // Strip query params
  req.pathAfterAuthority = pathAfterAuthority;

  next();
};
