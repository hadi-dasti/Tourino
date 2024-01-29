import { Entity,Column,PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class RegistrationManagementEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  names: string[];

  @Column({ type: "varchar", length: 255, nullable: true })
  images: string[];

  @Column({ type: "int", default: 0 })
  registeredCount: number;

  @Column({type:"int", default: 0 })
  suspendedCount: number;

  @Column({type:"int", default: 0 })
  cancelledCount: number;

  @Column({type:"int", default: 0 })
  totalRegistered: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registrationDate: Date;
}