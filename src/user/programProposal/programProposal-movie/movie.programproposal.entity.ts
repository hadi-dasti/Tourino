import { Column, ChildEntity } from "typeorm";
import { ProgramProposalEntity } from './../user.programproposal.entity';



@ChildEntity()
export class Movie extends ProgramProposalEntity{
    @Column({ type: 'bytea', nullable: true })
    movie: Buffer
}
