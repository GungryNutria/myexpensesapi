import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./acount.entity";

@Entity()
export class TypeAccount {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Account, (account) => account.typeAccount)
    accounts: Account[];
}