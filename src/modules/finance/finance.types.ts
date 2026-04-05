export interface CreateTransactionInput {
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  date: string;
  note?: string;
}
