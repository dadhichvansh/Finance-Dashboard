import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

import { ApiError } from '../utils/ApiError.js';
import { db } from '../config/db.js';

interface JwtPayload {
  id: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const protect = async (
  req: AuthRequest,
  _: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Not authorized, token missing'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    const user = await db.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        role: true,
        status: true,
      },
    });

    if (!user) {
      return next(new ApiError(401, 'User not found'));
    }

    if (user.status === 'INACTIVE') {
      return next(new ApiError(403, 'Account is inactive. Access denied.'));
    }

    req.user = {
      id: user.id,
      role: user.role,
    };

    next();
  } catch (error) {
    return next(new ApiError(401, 'Invalid or expired token'));
  }
};
