import { db } from '../../config/db.js';

export const getDashboardSummary = async (
  userId: string,
  filters?: { startDate?: string; endDate?: string },
) => {
  const dateFilter =
    filters?.startDate || filters?.endDate
      ? {
          date: {
            ...(filters?.startDate && {
              gte: new Date(filters.startDate),
            }),
            ...(filters?.endDate && {
              lte: new Date(filters.endDate),
            }),
          },
        }
      : {};

  const [incomeAgg, expenseAgg, categoryData, recentTransactions] =
    await Promise.all([
      db.transaction.aggregate({
        where: {
          userId,
          type: 'INCOME',
          ...dateFilter,
        },
        _sum: { amount: true },
      }),
      db.transaction.aggregate({
        where: {
          userId,
          type: 'EXPENSE',
          ...dateFilter,
        },
        _sum: { amount: true },
      }),
      db.transaction.groupBy({
        by: ['category', 'type'],
        where: { userId },
        _sum: { amount: true },
      }),
      db.transaction.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
        take: 5,
        select: {
          id: true,
          amount: true,
          type: true,
          category: true,
          date: true,
          note: true,
        },
      }),
    ]);

  const totalIncome = incomeAgg._sum.amount || 0;
  const totalExpense = expenseAgg._sum.amount || 0;

  const categoryBreakdown = categoryData.map((item) => ({
    category: item.category,
    type: item.type,
    total: item._sum.amount || 0,
  }));

  return {
    totalIncome,
    totalExpense,
    netBalance: totalIncome - totalExpense,
    categoryBreakdown,
    recentTransactions,
  };
};
