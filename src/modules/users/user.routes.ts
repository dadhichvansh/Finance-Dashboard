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

import { ROLES } from '../../constants.js';

const router = express.Router();

// Only ADMIN can view all users
router.get('/', protect, authorize(ROLES.ADMIN), getUsers);

// Update role (ADMIN only, cannot change own role)
router.patch('/:id/role', protect, authorize(ROLES.ADMIN), changeUserRole);

// Update status (ADMIN only, cannot change own role)
router.patch('/:id/status', protect, authorize(ROLES.ADMIN), changeUserStatus);

// Create user (ADMIN only)
router.post('/', protect, authorize(ROLES.ADMIN), createUser);

// Get user by ID (ADMIN only)
router.get('/:id', protect, authorize(ROLES.ADMIN), getUser);

export default router;
