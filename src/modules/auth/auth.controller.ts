import { Request, Response } from 'express';
import { registerUser, loginUser, logoutUser } from './auth.service.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

// POST /api/v1/auth/register
export const register = asyncHandler(async (req: Request, res: Response) => {
  const user = await registerUser(req.body);

  res.status(201).json(new ApiResponse('User registered successfully', user));
});

// POST /api/v1/auth/login
export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await loginUser(req.body);

  res.status(200).json(new ApiResponse('Login successful', result));
});

// POST /api/v1/auth/logout
export const logout = asyncHandler(async (req: Request, res: Response) => {
  await logoutUser();

  res.status(200).json(new ApiResponse('Logout successful'));
});
