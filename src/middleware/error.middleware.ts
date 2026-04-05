import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError.js';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let error = err;

  // If not ApiError → convert it
  if (!(error instanceof ApiError)) {
    error = new ApiError(500, error.message || 'Internal Server Error');
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};
