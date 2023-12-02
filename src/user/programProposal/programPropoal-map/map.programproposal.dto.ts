import { ProgramProposalDto } from './../user.programproposal.dto';


export class MapDto extends ProgramProposalDto{
    map: string
    latitude: number
    longitude: number
}