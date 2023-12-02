import { Entity, Column, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class ProgramProposalEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();
    
    @Column()
    programName: string
    
    @Column()
    programType: string
    
    @Column()
    destination: string
    
    @Column()
    safetyTips: string
    
    @Column({ type: 'timestamp' })
    suggestedDate: Date
    
    @Column()
    description: string
    
}