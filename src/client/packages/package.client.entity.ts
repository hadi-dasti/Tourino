import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class PackageClientEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  packageName: string;
  @Column()
  price: string;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; 
}