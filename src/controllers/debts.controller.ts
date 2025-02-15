import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DebtService } from '../services/debt.service';
import { Debt } from '../models/debt.entity';
import { DebtDto } from 'src/dtos/debt.dto';

@Controller('debts')
export class DebtsController {
  constructor(private readonly debtService: DebtService) {}

  @Post()
  create(@Body() createDebtDto: DebtDto): Promise<Debt> {
    return this.debtService.create(createDebtDto);
  }

  @Get()
  findAll(): Promise<Debt[]> {
    return this.debtService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Debt> {
    return this.debtService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateDebtDto: DebtDto): Promise<Debt> {
    return this.debtService.update(id, updateDebtDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.debtService.remove(id);
  }
}