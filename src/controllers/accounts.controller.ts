import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { AccountDto } from "src/dtos/account.dto";
import { AccountCreateDto } from "src/dtos/account_create.dto";
import { Account } from "src/models/acount.entity";
import { AccountService } from "src/services/account.service";

@Controller('accounts')
export class AccountsController {
    constructor(private  readonly accountService: AccountService) { }

    @Get(':userId')
    async getAccountsByUserId(@Param('userId') userId: number) {
        return await this.accountService.findByUserId(userId);
    }

    @Post()
    async createAccount(@Body() account: AccountCreateDto) {
        return await this.accountService.createAccount(account);
    }
}