import argon2 from 'argon2';

import { db } from '../../config/db.js';
import { RegisterInput, LoginInput } from './auth.types.js';
import { ApiError } from '../../utils/ApiError.js';
import { generateToken } from '../../utils/jwt.js';

export const registerUser = async (data: RegisterInput) => {
  const { name, email, password } = data;

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new ApiError(400, 'User already exists');
  }

  const hashedPassword = await argon2.hash(password);

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
    },
  });

  return user;
};

export const loginUser = async (data: LoginInput) => {
  const { email, password } = data;

  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }

  if (user.status === 'INACTIVE') {
    throw new ApiError(403, 'Your account is inactive. Contact admin.');
  }

  const isValid = await argon2.verify(user.password, password);

  if (!isValid) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = generateToken({
    id: user.id,
    role: user.role,
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    },
    token,
  };
};

export const logoutUser = async () => {
  return true;
};
