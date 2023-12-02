import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';



@Entity()
export class PackageEntity{
    @PrimaryGeneratedColumn()
    id: string
    
    @Column()
    name:string

    @Column()
    description: string
    
    @Column()
    cost : string
}