import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserManagementEntity } from './../user-management/user.management.entity';

// Enum for the possible values of fieldStatus
export enum ProgramStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  CANCELED = 'canceled',
}

@Entity()
export class ProgramManagementEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  programName: string;

  @Column()
  programTime: string;

  @Column({ type: "enum", enum: ProgramStatus })
  programStatus: ProgramStatus;

  @Column()
  price: string;

  @Column({ default: 0 })
  registeredPeople: number;

  @Column()
  popularity: string;

  @Column()
  operationIcons: string;

  @ManyToMany(() => UserManagementEntity)
  @JoinTable()
  registerUsers: UserManagementEntity[];

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  programManagementDate: Date;
}


