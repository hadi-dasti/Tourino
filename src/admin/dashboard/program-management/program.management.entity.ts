import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

export enum ProgramStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  CANCELLED = 'cancelled',
}

@Entity()
export class ProgramManagementEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  groupName: string;

  @Column()
  groupCode: string;

  @Column()
  programType: string;

  @Column()
  province: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ default: 0 })
  registeredPeople: number;

  @Column({
    type: 'enum',
    enum: ProgramStatus,
  })
  status: ProgramStatus;

  @Column({ type: 'timestamp' })
  timeOfEvent: Date;

  @Column({ default: 0 })
  popularity: number;

  @Column('simple-array')
  operationFieldIcons: string[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
