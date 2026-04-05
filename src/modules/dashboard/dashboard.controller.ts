import type { Response } from 'express';

import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { getDashboardSummary } from './dashboard.service.js';
import { AuthRequest } from '../../middleware/auth.middleware.js';

// GET /api/v1/dashboard/summary
export const getSummary = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const summary = await getDashboardSummary(req.user!.id, req.query as any);

    res.status(200).json(new ApiResponse('Dashboard summary fetched', summary));
  },
);
