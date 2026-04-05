import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import { ApiError } from '../utils/ApiError.js';

export const validate =
  (schema: z.ZodType) => (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.issues.map((err) => err.message).join(', ');

      return next(new ApiError(400, message));
    }

    req.body = result.data;
    next();
  };
