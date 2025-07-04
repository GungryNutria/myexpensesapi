import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Concept } from "./concept.entity";
import { Account } from "./acount.entity";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Account, (account) => account.user)
    accounts: Account[];
}