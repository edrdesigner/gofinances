import path from 'path';
import fs from 'fs';
import csvParse from 'csv-parse';
import { getRepository, In, getCustomRepository } from 'typeorm';

import uploadConfig from '../config/upload';
import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  filename: string;
}

interface CSVTransaction {
  title: string;
  type: string;
  value: string;
  category: string | Category;
}

class ImportTransactionsService {
  async execute({ filename }: Request): Promise<Transaction[]> {
    const categoriesRepository = getRepository(Category);
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const filePath = path.join(uploadConfig.directory, filename);
    const transactionReadStream = fs.createReadStream(filePath);

    const parsers = csvParse({
      from_line: 2,
    });

    const parseCSV = transactionReadStream.pipe(parsers);

    const transactions: CSVTransaction[] = [];
    const categories: string[] = [];

    parseCSV.on('data', async line => {
      const [title, type, value, category] = line.map((cell: string) =>
        cell.trim(),
      );

      if (!title || !type || !value || !category) return;

      categories.push(category);
      transactions.push({ title, type, value, category });
    });

    await new Promise(resolve => parseCSV.on('end', resolve));

    const existendCategories = await categoriesRepository.find({
      where: { title: In(categories) },
    });

    const existendCategoriesTitle = existendCategories.map(
      (category: Category) => category.title,
    );

    const addCategoryTitles = categories
      .filter((category: string) => !existendCategoriesTitle.includes(category))
      .filter((value, index, self) => self.indexOf(value) === index); // remove duplicates

    const newCategories = categoriesRepository.create(
      addCategoryTitles.map(title => ({ title })),
    );

    await categoriesRepository.save(newCategories);

    const finalCategories = [...newCategories, ...existendCategories];

    const transactionsToSave = transactions.map(transaction => ({
      title: transaction.title,
      type: transaction.type,
      value: Number.parseFloat(transaction.value),
      category: finalCategories.find(
        category => category.title === transaction.category,
      ),
    }));

    const createdTransactions = transactionRepository.create(
      transactionsToSave,
    );

    await transactionRepository.save(createdTransactions);

    await fs.promises.unlink(filePath);

    return createdTransactions;
  }
}

export default ImportTransactionsService;
