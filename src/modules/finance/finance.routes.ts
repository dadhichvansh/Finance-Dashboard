import express from 'express';

import {
  addTransaction,
  editTransaction,
  fetchTransactions,
  removeTransaction,
} from './finance.controller.js';
import { protect } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/rbac.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';

import { ROLES } from '../../constants.js';
import {
  createTransactionSchema,
  updateTransactionSchema,
} from '../../utils/validators/finance.validation.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Financial transaction APIs
 */

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 */
router.post(
  '/transactions',
  protect,
  authorize(ROLES.ADMIN),
  validate(createTransactionSchema),
  addTransaction,
);

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get transactions (with filters)
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 */
router.get(
  '/transactions',
  protect,
  authorize(ROLES.ADMIN, ROLES.ANALYST),
  fetchTransactions,
);

/**
 * @swagger
 * /transactions/{id}:
 *   patch:
 *     summary: Update transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 */
router.patch(
  '/transactions/:id',
  protect,
  authorize(ROLES.ADMIN),
  validate(updateTransactionSchema),
  editTransaction,
);

/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Delete transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 */
router.delete(
  '/transactions/:id',
  protect,
  authorize(ROLES.ADMIN),
  removeTransaction,
);

export default router;
