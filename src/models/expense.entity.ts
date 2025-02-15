import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column('decimal')
  amount: number;

  @Column({ type: 'date' })
  date: Date;

  @ManyToOne(() => User, user => user.expenses)
  user: User;
}