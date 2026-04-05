import express from 'express';

import {
  changeUserRole,
  changeUserStatus,
  createUser,
  getUser,
  getUsers,
} from './user.controller.js';

import { protect } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/rbac.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';

import { ROLES } from '../../constants.js';
import {
  createUserSchema,
  updateUserRoleSchema,
  updateUserStatusSchema,
} from '../../utils/validators/user.validation.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched
 */
router.get('/', protect, authorize(ROLES.ADMIN), getUsers);

/**
 * @swagger
 * /users/{id}/role:
 *   patch:
 *     summary: Update user role
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
router.patch(
  '/:id/role',
  protect,
  authorize(ROLES.ADMIN),
  validate(updateUserRoleSchema),
  changeUserRole,
);

/**
 * @swagger
 * /users/{id}/status:
 *   patch:
 *     summary: Update user status
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
router.patch(
  '/:id/status',
  protect,
  authorize(ROLES.ADMIN),
  validate(updateUserStatusSchema),
  changeUserStatus,
);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create user (Admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: User created
 */
router.post(
  '/',
  protect,
  authorize(ROLES.ADMIN),
  validate(createUserSchema),
  createUser,
);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get single user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', protect, authorize(ROLES.ADMIN), getUser);

export default router;
