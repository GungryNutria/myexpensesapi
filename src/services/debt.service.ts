import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Debt } from '../models/debt.entity';
import { DebtDto } from 'src/dtos/debt.dto';

@Injectable()
export class DebtService {
  constructor(
    @InjectRepository(Debt)
    private readonly debtRepository: Repository<Debt>,
  ) {}

  async create(createDebtDto: DebtDto): Promise<Debt> {
    const debt = this.debtRepository.create(createDebtDto);
    return await this.debtRepository.save(debt);
  }

  async findAll(): Promise<Debt[]> {
    return await this.debtRepository.find();
  }

  async findOne(id: number): Promise<Debt> {
    const debt = await this.debtRepository.findOne({ where: { id } });
    if (!debt) {
      throw new Error(`Debt with id ${id} not found`);
    }
    return debt;
  }

  async update(id: number, updateDebtDto: DebtDto): Promise<Debt> {
    await this.debtRepository.update(id, updateDebtDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.debtRepository.delete(id);
  }
}