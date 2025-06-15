import { Controller, Get } from "@nestjs/common";
import { CategoryService } from "src/services/category.service";

@Controller('categories')
export class CategoriesController {

    constructor(private readonly categoryService: CategoryService) { }

    @Get()
    async getCategories() {
        return await this.categoryService.findAll();
    }
}