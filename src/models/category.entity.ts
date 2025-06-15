import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Concept } from "./concept.entity";
import { Account } from "./acount.entity";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    operation: number; // 1: income, 2: expense

    @Column()
    name: string;
    
    @OneToMany(() => Concept, (concept) => concept.category)
    concepts: Concept[];
}