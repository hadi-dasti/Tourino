import { Entity,PrimaryGeneratedColumn,Column,JoinTable, ManyToOne } from 'typeorm';
import { AuthUserEntity } from '../authUser/auth.user.entity';


@Entity()
export class MyTeamUser{
    @PrimaryGeneratedColumn()
    id: string
    
    @Column()
    name: string
    
    @Column()
    lastName: string

    @Column()
    nationalCode: string
    
    @ManyToOne(() => AuthUserEntity, authUserEntity => authUserEntity.myTeamUsers) 
    @JoinTable()
    user : AuthUserEntity
}