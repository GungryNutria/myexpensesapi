import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { DebtMonth } from "./debtmonth.entity";

@Entity()
export class Debt {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column('decimal')
    amount: number;

    @Column({ type: 'date' })
    date: Date;

    @ManyToOne(() => User, user => user.debts)
    user: User;

    @OneToMany(() => DebtMonth, debtMonth => debtMonth.debt)
    debtsMonth: DebtMonth[];
}