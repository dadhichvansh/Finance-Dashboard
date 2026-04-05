import type { Response } from 'express';

import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from './finance.service.js';
import { AuthRequest } from '../../middleware/auth.middleware.js';
import { ApiError } from '../../utils/ApiError.js';

// POST /api/finance/transactions
export const addTransaction = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const transaction = await createTransaction(req.body, req.user!.id);

    res.status(201).json(new ApiResponse('Transaction created', transaction));
  },
);

// GET /api/finance/transactions
export const fetchTransactions = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const transactions = await getTransactions(req.user!.id, req.query as any);

    res.status(200).json(new ApiResponse('Transactions fetched', transactions));
  },
);

// PATCH /api/finance/transactions/:id
export const editTransaction = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const transactionId = req.params.id;

    if (!transactionId || Array.isArray(transactionId)) {
      throw new ApiError(400, 'Invalid transaction ID');
    }

    const updated = await updateTransaction(
      transactionId,
      req.user!.id,
      req.body,
    );

    res.status(200).json(new ApiResponse('Transaction updated', updated));
  },
);

// DELETE /api/finance/transactions/:id
export const removeTransaction = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const transactionId = req.params.id;

    if (!transactionId || Array.isArray(transactionId)) {
      throw new ApiError(400, 'Invalid transaction ID');
    }

    const deleted = await deleteTransaction(transactionId, req.user!.id);

    res.status(200).json(new ApiResponse('Transaction deleted', deleted));
  },
);
