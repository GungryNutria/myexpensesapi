import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from '../models/expense.entity';
import { ExpenseDto } from 'src/dtos/expense.dto';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) {}

  async create(createExpenseDto: ExpenseDto): Promise<Expense> {
    const expense = this.expenseRepository.create(createExpenseDto);
    return await this.expenseRepository.save(expense);
  }

  async findAll(): Promise<Expense[]> {
    return await this.expenseRepository.find();
  }

  async findOne(id: number): Promise<Expense> {
    const user = await this.expenseRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`Expense with id ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateExpenseDto: ExpenseDto): Promise<Expense> {
    await this.expenseRepository.update(id, updateExpenseDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.expenseRepository.delete(id);
  }
}