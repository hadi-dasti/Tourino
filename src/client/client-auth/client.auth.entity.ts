import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// Define the entity name and table name
@Entity()
export class ClientAuthEntity {
  // Define the columns of the table
  // Each column corresponds to a property of the class
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  managerFirstName: string;

  @Column()
  managerLastName: string;

  @Column()
  nationalCode: string;

  @Column()
  dateOfBirth: string;

  @Column()
  managerMobileNumber: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  password: string;

  @Column()
  fatherName: string;

  @Column()
  nameOfCenter: string;

  @Column()
  centerLogo: string;

  @Column()
  province: string;

  @Column()
  city: string;

  @Column()
  address: string;

  @Column()
  landLinePhone: string;

  @Column()
  socialNetworks: string;

  @Column()
  website: string;

  @Column({ type: 'bytea', nullable: true })
  uploadFiles: Buffer;
}
