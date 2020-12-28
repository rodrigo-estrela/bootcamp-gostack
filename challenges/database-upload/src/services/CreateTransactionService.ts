import { getRepository, getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  categoryTitle: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    categoryTitle,
  }: Request): Promise<Transaction> {
    const categoryRepository = getRepository(Category);
    const informedCategory = await categoryRepository.findOne({
      where: { title: categoryTitle },
    });

    let category: Category;

    if (!informedCategory) {
      const categoryToBeAdded = categoryRepository.create({
        title: categoryTitle,
      });
      await categoryRepository.save(categoryToBeAdded);
      category = categoryToBeAdded;
    } else {
      category = informedCategory;
    }

    const transactionRepository = getCustomRepository(TransactionsRepository);
    const { total } = await transactionRepository.getBalance();
    if (type === 'outcome' && value > total) {
      throw new AppError(
        'Total balance is not enought to process this transaction',
        400,
      );
    }

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
