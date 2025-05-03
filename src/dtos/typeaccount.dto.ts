import { Expose } from "class-transformer";
import e from "express";

export class TypeAccountDto {
    @Expose()
    id: number;
    @Expose()
    name: string;
}