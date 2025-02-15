import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Expense } from "./expense.entity";
import { Debt } from "./debt.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column()
    username: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    salary: number;
    @Column({ type: 'date' })
    dateOfBirth: Date;
    @OneToMany(() => Expense, expense => expense.user)
    expenses: Expense[];
    @OneToMany(() => Debt, debt => debt.user)
    debts: Debt[];
}