/**
 * @summary Error handling middleware
 * @module middleware/error
 */

import { Request, Response, NextFunction } from 'express';

/**
 * @summary Global error handling middleware
 * @param error Error object
 * @param req Express request
 * @param res Express response
 * @param next Express next function
 */
export async function errorMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  console.error('Error:', {
    statusCode,
    message,
    stack: error.stack,
    path: req.path,
    method: req.method,
  });

  res.status(statusCode).json({
    success: false,
    error: {
      code: error.code || 'INTERNAL_ERROR',
      message,
      timestamp: new Date().toISOString(),
    },
  });
}
