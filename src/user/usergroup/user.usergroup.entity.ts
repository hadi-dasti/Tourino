import { PrimaryGeneratedColumn, Entity, Column,ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { AuthUserEntity } from '../authUser/auth.user.entity';

// Mark this class as a TypeORM entity
@Entity()
export class UserGroupEntity{
    @PrimaryGeneratedColumn('uuid')// Define a UUID primary key column
    id: string
    
    @Column() // Define a string column
    nameGroup: string
    
    @Column({ type: 'bytea' }) // Define a binary data column
    image: Buffer
    
    @Column({unique:true})// Define a unique string column
    codeGroup: string
    
    @ManyToOne(() => AuthUserEntity, (user) => user.userGroup)// Define a many-to-one relationship with the AuthUserEntity
    user: AuthUserEntity

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })// Define a timestamp column for the creation date
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })// Define a timestamp column for the update date
    updatedAt: Date;

}