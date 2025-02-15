import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Debt } from "./debt.entity";

@Entity()
export class DebtMonth {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    monthNumber: number;

    @Column()
    amount: number;

    @Column()
    status: boolean;

    @ManyToOne(() => Debt, debt => debt.debtsMonth)
    debt: Debt;
}