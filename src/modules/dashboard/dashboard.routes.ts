import express from 'express';

import { getSummary } from './dashboard.controller.js';
import { protect } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/rbac.middleware.js';

import { ROLES } from '../../constants.js';

const router = express.Router();

// ADMIN + ANALYST can view dashboard
router.get(
  '/summary',
  protect,
  authorize(ROLES.ADMIN, ROLES.ANALYST),
  getSummary,
);

export default router;
