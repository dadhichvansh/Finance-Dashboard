import type { Response, NextFunction } from 'express';

import { AuthRequest } from './auth.middleware.js';
import { ApiError } from '../utils/ApiError.js';

export const authorize = (...allowedRoles: string[]) => {
  return (req: AuthRequest, _: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError(401, 'Unauthorized'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new ApiError(403, 'Forbidden: insufficient permissions'));
    }

    next();
  };
};
