import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { User } from './models/user.entity';
import { UsersController } from './controllers/users.controller';
import { UserService } from './services/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { Concept } from './models/concept.entity';
import { Category } from './models/category.entity';
import { Account } from './models/acount.entity';
import { TypeAccount } from './models/typeacount.entity';
import { AccountsController } from './controllers/accounts.controller';
import { AccountService } from './services/account.service';
import { TypeAccountsController } from './controllers/typeAccounts.controller';
import { TypeAccountService } from './services/typeAccount.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([User, Concept, Category, Account, TypeAccount]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UsersController, AccountsController, TypeAccountsController],
  providers: [UserService, AccountService, TypeAccountService, JwtStrategy],
  exports:[PassportModule]
})
export class AppModule {}
