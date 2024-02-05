import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { SituationUser } from './uesr.management.enum';

@Entity()
export class UserManagementEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({ type: 'enum', enum: SituationUser })
  situation: SituationUser;

  @Column()
  paymentAmount: string;

  @Column()
  nationalCode: string;

  @Column('text', { array: true })
  programs: string[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registeryUser: Date;
}
