import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';


@Entity()
export class AuthAdminEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  adminName: string;

  @Column()
  password: string;

  @Column()
  mobileNumber: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  codeOtp: string

 

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; // Timestamp of when the admin was created
}
