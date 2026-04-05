import express from 'express';

import { getSummary } from './dashboard.controller.js';
import { protect } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/rbac.middleware.js';

import { ROLES } from '../../constants.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard analytics APIs
 */

/**
 * @swagger
 * /dashboard/summary:
 *   get:
 *     summary: Get dashboard summary
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 */
router.get(
  '/summary',
  protect,
  authorize(ROLES.ADMIN, ROLES.ANALYST),
  getSummary,
);

export default router;
