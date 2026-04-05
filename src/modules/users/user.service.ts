import argon2 from 'argon2';

import { db } from '../../config/db.js';
import { ROLES } from '../../constants.js';
import { ApiError } from '../../utils/ApiError.js';

export const getAllUsers = async (page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    db.user.findMany({
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    db.user.count(),
  ]);

  return {
    users,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const updateUserRole = async (
  userId: string,
  role: 'VIEWER' | 'ANALYST' | 'ADMIN',
  currentUserId: string,
) => {
  if (userId === currentUserId) {
    throw new ApiError(400, 'You cannot change your own role');
  }

  if (!Object.values(ROLES).includes(role)) {
    throw new ApiError(400, 'Invalid role');
  }

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const updatedUser = await db.user.update({
    where: { id: userId },
    data: { role },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
    },
  });

  return updatedUser;
};

export const updateUserStatus = async (
  userId: string,
  status: 'ACTIVE' | 'INACTIVE',
  currentUserId: string,
) => {
  if (userId === currentUserId) {
    throw new ApiError(400, 'You cannot change your own status');
  }

  const allowedStatus = ['ACTIVE', 'INACTIVE'];

  if (!allowedStatus.includes(status)) {
    throw new ApiError(400, 'Invalid status');
  }

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const updatedUser = await db.user.update({
    where: { id: userId },
    data: { status },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
    },
  });

  return updatedUser;
};

export const createUserByAdmin = async (data: {
  name: string;
  email: string;
  password: string;
  role: 'VIEWER' | 'ANALYST' | 'ADMIN';
}) => {
  const { name, email, password, role } = data;

  if (!Object.values(ROLES).includes(role)) {
    throw new ApiError(400, 'Invalid role');
  }

  const existingUser = await db.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (existingUser) {
    throw new ApiError(400, 'User already exists');
  }

  const hashedPassword = await argon2.hash(password);

  const user = await db.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  return user;
};

export const getUserById = async (userId: string) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user;
};
