import { AuthUserEntity } from '../authUser/auth.user.entity';

export class MyTeamDTO{
    id: string
    name: string
    lastName: string
    nationalCode:string
    user: AuthUserEntity
}