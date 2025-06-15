import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { CategoryDto } from "src/dtos/category.dto";
import { Category } from "src/models/category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
    ){}

    async findAll(): Promise<CategoryDto[]> {
        try {
            const categories = await this.categoryRepository.find();
            if(!categories || categories.length === 0) return [];
            return plainToInstance(CategoryDto, categories);
        } catch (error) {
            throw new InternalServerErrorException(`Error fetching categories: ${error.message}`);
        }
    }
}