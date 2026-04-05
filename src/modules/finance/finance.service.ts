import { db } from '../../config/db.js';
import { ApiError } from '../../utils/ApiError.js';
import { CreateTransactionInput } from './finance.types.js';

export const createTransaction = async (
  data: CreateTransactionInput,
  userId: string,
) => {
  const { amount, type, category, date, note } = data;

  if (amount <= 0) {
    throw new ApiError(400, 'Amount must be greater than 0');
  }

  const transaction = await db.transaction.create({
    data: {
      amount,
      type,
      category,
      date: new Date(date),
      note,
      userId,
    },
  });

  return transaction;
};

export const getTransactions = async (
  userId: string,
  filters: {
    type?: string;
    category?: string;
    startDate?: string;
    endDate?: string;
  },
) => {
  const { type, category, startDate, endDate } = filters;

  const where: any = {
    userId,
  };

  if (type) {
    where.type = type;
  }

  if (category) {
    where.category = category;
  }

  if (startDate || endDate) {
    where.date = {};

    if (startDate) {
      where.date.gte = new Date(startDate);
    }

    if (endDate) {
      where.date.lte = new Date(endDate);
    }
  }

  const transactions = await db.transaction.findMany({
    where,
    orderBy: {
      date: 'desc',
    },
  });

  return transactions;
};

export const updateTransaction = async (
  transactionId: string,
  userId: string,
  data: any,
) => {
  const transaction = await db.transaction.findUnique({
    where: { id: transactionId },
  });

  if (!transaction) {
    throw new ApiError(404, 'Transaction not found');
  }

  // 🔐 Ownership check
  if (transaction.userId !== userId) {
    throw new ApiError(403, 'You cannot modify this transaction');
  }

  const updated = await db.transaction.update({
    where: { id: transactionId },
    data: {
      ...data,
      date: data.date ? new Date(data.date) : undefined,
    },
  });

  return updated;
};

export const deleteTransaction = async (
  transactionId: string,
  userId: string,
) => {
  const transaction = await db.transaction.findUnique({
    where: { id: transactionId },
  });

  if (!transaction) {
    throw new ApiError(404, 'Transaction not found');
  }

  // 🔐 Ownership check
  if (transaction.userId !== userId) {
    throw new ApiError(403, 'You cannot delete this transaction');
  }

  await db.transaction.delete({
    where: { id: transactionId },
  });

  return true;
};
