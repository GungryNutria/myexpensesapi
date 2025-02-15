import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { Expense } from './models/expense.entity';
import { User } from './models/user.entity';
import { ExpensesController } from './controllers/expenses.controller';
import { UsersController } from './controllers/users.controller';
import { ExpenseService } from './services/expense.service';
import { UserService } from './services/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([User, Expense]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ExpensesController, UsersController],
  providers: [UserService, ExpenseService, JwtStrategy],
  exports:[PassportModule]
})
export class AppModule {}
