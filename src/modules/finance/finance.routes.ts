import express from 'express';

import {
  addTransaction,
  editTransaction,
  fetchTransactions,
  removeTransaction,
} from './finance.controller.js';
import { protect } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/rbac.middleware.js';

import { ROLES } from '../../constants.js';

const router = express.Router();

// Only ADMIN can create transactions
router.post('/transactions', protect, authorize(ROLES.ADMIN), addTransaction);

// ADMIN + ANALYST can view
router.get(
  '/transactions',
  protect,
  authorize(ROLES.ADMIN, ROLES.ANALYST),
  fetchTransactions,
);

// Update (only ADMIN)
router.patch(
  '/transactions/:id',
  protect,
  authorize(ROLES.ADMIN),
  editTransaction,
);

// Delete (only ADMIN)
router.delete(
  '/transactions/:id',
  protect,
  authorize(ROLES.ADMIN),
  removeTransaction,
);

export default router;
