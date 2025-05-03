import { Column, Double, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Category } from "./category.entity";
import { Account } from "./acount.entity";

@Entity()
export class Concept{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    type: string;

    @Column({type: 'float'})
    mount: number;
    
    @Column()
    operation: string; // 'income' | 'expense'

    @ManyToOne(() => Category, (category) => category.concepts)
    category: Category;

    @ManyToOne(() => Account, (account) => account.concepts)
    account: Account;
}