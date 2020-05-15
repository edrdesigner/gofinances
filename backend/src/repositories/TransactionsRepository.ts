import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    return transactions.reduce(
      (balanceCalc, transaction) => {
        const balance = balanceCalc;

        if (transaction.type === 'income') {
          balance.income += Number.parseFloat(
            transaction.value ? transaction.value.toString() : '0',
          );
        } else {
          balance.outcome += Number.parseFloat(
            transaction.value ? transaction.value.toString() : '0',
          );
        }

        balance.total = balance.income - balance.outcome;

        return balance;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
  }
}

export default TransactionsRepository;
