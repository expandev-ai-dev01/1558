/**
 * @summary 404 Not Found middleware
 * @module middleware/notFound
 */

import { Request, Response, NextFunction } from 'express';

/**
 * @summary Handles requests to non-existent routes
 * @param req Express request
 * @param res Express response
 * @param next Express next function
 */
export async function notFoundMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.path} not found`,
      timestamp: new Date().toISOString(),
    },
  });
}
