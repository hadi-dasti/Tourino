import { MyTeamDTO } from '../myTeam/user.myTeam.dto';

export class ProfileUserDTO{
    id:string
    nationalCode: string
    password: string
    fatherName: string
    bloodCategory: string
    city: string
    image: Buffer
    myTeamUsers:MyTeamDTO[]
}