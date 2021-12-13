import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import Expense from './Expense';

@Entity('grants')
export default class Grant extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  grantName: string;

  @Column({ type: 'timestamp with time zone' })
  openDate: Date;

  @Column({ type: 'timestamp with time zone' })
  closeDate: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  dateWhenFundsWereReceived: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  expirationDate: Date;

  @Column()
  status: string;

  @Column({ type: 'decimal' })
  amountRequested: number;

  @Column({ type: 'decimal', nullable: true })
  amountApproved: number;

  @Column({ nullable: true })
  sponsorName: string;

  @Column({ nullable: true })
  sponsorUrl: string;

  @OneToMany(() => Expense, expense => expense.grant)
  expenses: Expense[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
