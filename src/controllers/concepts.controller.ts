import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ConceptCreateDto } from "src/dtos/concept_create.dto";
import { ConceptService } from "src/services/concept.service";

@Controller('concepts')
export class ConceptsController {
    constructor(private readonly conceptService: ConceptService) { }

    @Get(':accountId')
    async getConceptsByAccountId(@Param('accountId') accountId: number) {
        return await this.conceptService.findByAccountId(accountId);
    }

    @Post()
    async createConcept(@Body() concept: ConceptCreateDto) {
        return await this.conceptService.createConcept(concept);
    }

    @Delete(':conceptId')
    async deleteConcept(@Param('conceptId') conceptId: number) {
        return await this.conceptService.deleteConcept(conceptId);
    }
}