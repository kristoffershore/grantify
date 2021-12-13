import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToOne,
} from 'typeorm';
import PermissionType from './PermissionType';
import User from './User';

@Entity('permission_types_users_assn')
export default class UserPermissionAssociation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @OneToOne(() => User)
  user: User;

  @Column()
  permissionTypeId: number;

  @OneToOne(() => PermissionType)
  permissionType: PermissionType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
