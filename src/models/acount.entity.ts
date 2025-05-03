import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";
import { TypeAccount } from "./typeacount.entity";
import { on } from "events";
import { Concept } from "./concept.entity";
import { User } from "./user.entity";

@Entity()
export class Account{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => TypeAccount, (typeAccount) => typeAccount.accounts)
    typeAccount: TypeAccount;

    @ManyToOne(() => User, (user) => user.accounts)
    user: User;

    @OneToMany(() => Concept, (concept) => concept.account)
    concepts: Concept[];
}
