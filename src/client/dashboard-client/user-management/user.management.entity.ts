import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { SituationUser, GenderUser, RegistrationStatusUser } from './uesr.management.enum';

@Entity()
export class UserManagementEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({ type: "enum", enum: SituationUser })
  situation: SituationUser;

  @Column()
  paymentAmount: string;

  @Column()
  nationalCode: string;

  @Column("varchar", { array: true, nullable: true })
  province: string[];

  @Column({ type: "enum", enum: GenderUser, nullable: true })
  gender: GenderUser;

  @Column({ type: "enum", enum: RegistrationStatusUser, nullable: true })
  registrationStatus: RegistrationStatusUser;

  @Column("varchar", { array: true , nullable:true })
  programs: string[];

  @Column({ type: "date", nullable: true })
  dateOfBirth: Date;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  registeryUser: Date;
}
