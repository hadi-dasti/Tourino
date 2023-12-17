import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

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

  // Hashes the password before inserting into the database
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; // Timestamp of when the admin was created
}
