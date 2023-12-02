import { ChildEntity, Column} from "typeorm";
import { ProgramProposalEntity } from './../user.programproposal.entity';

@ChildEntity()
export class ImageProgaramEntity extends ProgramProposalEntity {
    @Column({ type: 'bytea', nullable: true })
    image:Buffer
}