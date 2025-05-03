import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { AccountDto } from "src/dtos/account.dto";
import { AccountCreateDto } from "src/dtos/account_create.dto";
import { Account } from "src/models/acount.entity";
import { TypeAccount } from "src/models/typeacount.entity";
import { User } from "src/models/user.entity";
import { In, Repository } from "typeorm";

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account) private readonly accountRepository: Repository<Account>,
        @InjectRepository(TypeAccount) private readonly typeAccountRepository: Repository<TypeAccount>,
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

    async findByUserId(userId: number): Promise<AccountDto[]> {
        try{
            const accounts = await this.accountRepository.find({ 
                where: { user: { id: userId } },
                relations: ['typeAccount', 'user', 'concepts']
            });

            if (!accounts || accounts.length === 0)
                throw new NotFoundException(`No accounts found for user`);

            return plainToInstance(AccountDto, accounts);

        }catch (error) {
            throw new InternalServerErrorException(`Error fetching accounts for user ID ${userId}: ${error.message}`);
        }
    }

    async createAccount(accountDto: AccountCreateDto): Promise<AccountDto> {
        try {
            const typeAccount = await this.typeAccountRepository.findOneBy({ id: accountDto.typeAccountId });
            const user = await this.userRepository.findOneBy({ id: accountDto.userId });

            if (!typeAccount || !user) throw new NotFoundException('Tipo de cuenta o usuario no encontrado');
              
            const account = this.accountRepository.create({
                ...accountDto,
                typeAccount,
                user
            });
            const savedAccount = await this.accountRepository.save(account);
            return plainToInstance(AccountDto, savedAccount, { excludeExtraneousValues: true });
        } catch (error) {
            throw new InternalServerErrorException(`Error creating account: ${error.message}`);
        }
    }
}