import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
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
import { ConceptsController } from './controllers/concepts.controller';
import { ConceptService } from './services/concept.service';
import { CategoriesController } from './controllers/categories.controller';
import { CategoryService } from './services/category.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([User, Concept, Category, Account, TypeAccount]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UsersController, AccountsController, TypeAccountsController, ConceptsController, CategoriesController],
  providers: [UserService, AccountService, ConceptService, CategoryService, TypeAccountService, JwtStrategy],
  exports:[PassportModule]
})
export class AppModule {}
