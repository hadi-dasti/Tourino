import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class DashboardLoginEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastLogin: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  loginTime: Date;
}
