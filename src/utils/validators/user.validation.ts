import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(['VIEWER', 'ANALYST', 'ADMIN']),
});

export const updateUserRoleSchema = z
  .object({
    role: z.enum(['VIEWER', 'ANALYST', 'ADMIN']),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export const updateUserStatusSchema = z
  .object({
    status: z.enum(['ACTIVE', 'INACTIVE']),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });
