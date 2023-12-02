import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { MyTeamUser } from '../myTeam/user.myTeam.entity';
import { UserGroup } from '../usergroup/user.usergroup.entity';

@Entity({name: 'auth_user_entity'})
export class AuthUserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string  // Unique identifier for the user
    
    @Column()
    fullName: string // Full name of the user
    
    @Column()
    mobileNumber: string  // Mobile number of the user

    @Column({nullable:true})
    nationalCode: string

    @Column({nullable:true})
    password: string

    @Column({nullable:true})
    fatherName: string

    @Column({ nullable: true })
    bloodCategory: string
    
    @Column({nullable:true})
    city:string

    @Column({ type: 'bytea', nullable: true })
    image: Buffer
 

    @Column({nullable:true})
    otpMobileCode: string  // One-time password for mobile verification

    @OneToMany(() => MyTeamUser, myTeamUser => myTeamUser.user)
    myTeamUsers: MyTeamUser | null
    

    @OneToMany(() => UserGroup, (userGroup) => userGroup.user)
    userGroup: UserGroup[]
    
   
    @Column({ default: false })
    isVerified: boolean // Flag to indicate if the user is verified

    @CreateDateColumn({type:"timestamp" , default :()=> "CURRENT_TIMESTAMP"})
    createdAt: Date; // Timestamp of when the user was created

    @UpdateDateColumn({type:"timestamp", default:()=>"CURRENT_TIMESTAMP"})
    updatedAt:Date  // Timestamp of when the user was last updated
}