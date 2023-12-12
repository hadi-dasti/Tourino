import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RegisterClientEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column()
    managerFirstName: string
    
    @Column()
    managerLastName: string
    
    @Column()
    nationalCode: string
    
    @Column()
    dateOfBirth: string
    
    @Column({unique:true})
    email: string
    
    @Column({unique:true})
    password: string
    
    @Column()
    fatherName: string
    
    @Column()
    nameOfCenter: string
    
    @Column()
    managerMobileNumber: string
    
    @Column()
    province: string
    
    @Column()
    city: string
    
    @Column()
    address: string
    
    @Column()
    landLinePhone: string
    
    @Column()
    socialNetworks: string
    
    @Column()
    website: string
    
    @Column()
    centerLogo:string

    @CreateDateColumn({type:"timestamp" , default :()=> "CURRENT_TIMESTAMP"})
    createdAt: Date; // Timestamp of when the user was created
}