import { Category } from "src/models/category.entity";
import { CategoryDto } from "./category.dto";

export class ConceptDto {
    id: number;
    description: string;
    mount: number;
    category: CategoryDto;
    regstrationDate: Date;
}