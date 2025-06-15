import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeAccount } from "src/models/typeacount.entity";
import { Repository } from "typeorm";

@Injectable()
export class TypeAccountService {
    
    constructor(@InjectRepository(TypeAccount) private readonly typeAccountRepository: Repository<TypeAccount>) {}

    async findAll(): Promise<TypeAccount[]> {
        try {
            const typeAccounts = await this.typeAccountRepository.find();

            if (!typeAccounts || typeAccounts.length === 0) {
                throw new NotFoundException('No type accounts found');
            }

            return typeAccounts;
        }
        catch (error) {
            throw new InternalServerErrorException(`Error fetching type accounts: ${error.message}`);
        }
    }
}