import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    TableInheritance,
    UpdateDateColumn
} from "typeorm";



@Entity()
@TableInheritance({ column: { type: 'varchar' } })
export class AuthUserEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column()
    fullName: string
    
    @Column({unique:true})
    mobileNumber: string
    
    @Column({nullable: true })
    codeOtp: string
    
    @Column({ default: false })
    isVerified: boolean // Flag to indicate if the user is verified

     @CreateDateColumn({type:"timestamp" , default :()=> "CURRENT_TIMESTAMP"})
    createdAt: Date; // Timestamp of when the user was created

    @UpdateDateColumn({type:"timestamp", default:()=>"CURRENT_TIMESTAMP"})
    updatedAt:Date  // Timestamp of when the user was last updated

}