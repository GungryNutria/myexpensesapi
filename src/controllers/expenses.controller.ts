import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ExpenseDto } from "src/dtos/expense.dto";
import { Expense } from "src/models/expense.entity";
import { ExpenseService } from "src/services/expense.service";

@Controller('expenses')
export class ExpensesController {
    constructor(private readonly expenseService: ExpenseService) { }

    @Post()
    create(@Body() createExpenseDto: ExpenseDto): Promise<Expense> {
        return this.expenseService.create(createExpenseDto);
    }

    @Get()
    findAll(): Promise<Expense[]> {
        return this.expenseService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Expense> {
        return this.expenseService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateExpenseDto: ExpenseDto): Promise<Expense> {
        return this.expenseService.update(id, updateExpenseDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.expenseService.remove(id);
    }
}