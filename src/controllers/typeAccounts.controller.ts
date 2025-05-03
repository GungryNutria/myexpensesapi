import { Controller, Get } from "@nestjs/common";
import { TypeAccountService } from "src/services/typeAccount.service";

@Controller('type-accounts')
export class TypeAccountsController {
    constructor(private readonly typeAccountService: TypeAccountService) { }
    @Get()
    async getTypeAccounts() {
        return await this.typeAccountService.findAll();
    }
}