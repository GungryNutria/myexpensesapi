import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

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

    @Column()
    debtMonts: number;
    @ManyToOne(() => User, user => user.debts)
    user: User;
}