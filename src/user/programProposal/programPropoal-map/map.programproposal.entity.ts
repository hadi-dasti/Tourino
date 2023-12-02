import { ChildEntity, Column } from 'typeorm';
import { ProgramProposalEntity } from "../user.programproposal.entity";




@ChildEntity()
export class Map extends ProgramProposalEntity{
    @Column({ type: 'bytea', nullable: true })
    map: string
    @Column({ type: 'double precision' })
    latitude: number

    @Column({ type: 'double precision' })
    longitude: number
}
