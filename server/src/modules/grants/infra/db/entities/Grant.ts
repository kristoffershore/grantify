import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

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

  @Column()
  status: string;

  @Column({ type: 'decimal' })
  amountRequested: number;

  @Column({ type: 'decimal' })
  amountApproved: number;

  @Column({ nullable: true })
  sponsorName: string;

  @Column({ nullable: true })
  sponsorUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
