import type { Request, Response } from 'express';

import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import {
  createUserByAdmin,
  getAllUsers,
  getUserById,
  updateUserRole,
  updateUserStatus,
} from './user.service.js';
import { AuthRequest } from '../../middleware/auth.middleware.js';

// GET /api/v1/users
export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const page: number = Number(req.query?.page) || 1;
  const limit: number = Number(req.query?.limit) || 10;

  const users = await getAllUsers(page, limit);

  res.status(200).json(new ApiResponse('Users fetched successfully', users));
});

// PUT /api/v1/users/:id/role
export const changeUserRole = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { role } = req.body;
    const userId = req.params?.id;

    if (!userId || Array.isArray(userId)) {
      return res.status(400).json(new ApiResponse('Invalid user ID'));
    }

    const updatedUser = await updateUserRole(userId, role, req.user!.id);

    res.status(200).json(new ApiResponse('User role updated', updatedUser));
  },
);

// PUT /api/v1/users/:id/status
export const changeUserStatus = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { status } = req.body;
    const userId = req.params?.id;

    if (!userId || Array.isArray(userId)) {
      return res.status(400).json(new ApiResponse('Invalid user ID'));
    }

    const updatedUser = await updateUserStatus(userId, status, req.user!.id);

    res.status(200).json(new ApiResponse('User status updated', updatedUser));
  },
);

// POST /api/v1/users
export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await createUserByAdmin(req.body);

  res.status(201).json(new ApiResponse('User created successfully', user));
});

// GET /api/v1/users/:id
export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.id;

  if (!userId || Array.isArray(userId)) {
    return res.status(400).json(new ApiResponse('Invalid user ID'));
  }
  const user = await getUserById(userId);

  res.status(200).json(new ApiResponse('User fetched successfully', user));
});
