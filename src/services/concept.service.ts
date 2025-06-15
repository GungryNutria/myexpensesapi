import { Inject, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { NotFoundError } from "rxjs";
import { ConceptDto } from "src/dtos/concept.dto";
import { ConceptCreateDto } from "src/dtos/concept_create.dto";
import { Account } from "src/models/acount.entity";
import { Category } from "src/models/category.entity";
import { Concept } from "src/models/concept.entity";
import { User } from "src/models/user.entity";
import { Between, Repository } from "typeorm";

export class ConceptService{
    constructor(
        @InjectRepository(Concept) private readonly conceptRepository: Repository<Concept>,
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
        @InjectRepository(Account) private readonly userRepository: Repository<Account>

    ) { }

    async findByAccountId(accountId: number): Promise<ConceptDto[]> {
        try {
            const now = new Date();
            const StartMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const endMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            const concepts = await this.conceptRepository.find({ 
                where: { 
                    account: {id: accountId},
                    registrationDate: Between(StartMonth, endMonth)
                }, 
                relations: ['category']
            }); // Ensure concepts is an array

            if(!concepts || concepts.length === 0) {
                return [];
            }
            return plainToInstance(ConceptDto, concepts);
        } catch (error) {
            throw new InternalServerErrorException(`Error fetching concepts for account ID ${accountId}: ${error.message}`);
        }
        
    }

    async createConcept(concept: ConceptCreateDto): Promise<ConceptDto> {
        try {
            const category = await this.categoryRepository.findOneBy({ id: concept.categoryId });
            const account = await this.userRepository.findOneBy({ id: concept.accountId });
            if (!category || !account) throw new NotFoundException('Category or Account not found');
            const newConcept = this.conceptRepository.create({
                ...concept,
                category,
                account
            });
            const savedConcept = await this.conceptRepository.save(newConcept);
            var conceptWithRelations = await this.conceptRepository.findOne({
                where: { id: savedConcept.id },
                relations: ['category']
            });
            return plainToInstance(ConceptDto, conceptWithRelations); // Return true if saved successfully
        } catch (error) {
            throw new InternalServerErrorException(`Error creating concept: ${error.message}`);
        }
    }
    
    async deleteConcept(conceptId: number): Promise<boolean> {
        try {
            const concept = await this.conceptRepository.findOneBy({ id: conceptId });
            if (!concept) throw new NotFoundException('Concept not found');
            await this.conceptRepository.remove(concept);
            return true;
        } catch (error) {
            throw new InternalServerErrorException(`Error deleting concept with ID ${conceptId}: ${error.message}`);
        }
    }
}