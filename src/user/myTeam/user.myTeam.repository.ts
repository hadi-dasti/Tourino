import { AppDataSource } from '../../dataSource';
import { MyTeamUser } from './user.myTeam.entity';
import { MyTeamDTO } from './user.myTeam.dto';
import { AuthUserEntity } from '../authUser/auth.user.entity';



export const MyTeamUserRepoitory = AppDataSource.getRepository(MyTeamUser).extend({

     buildMyTeamUser(myTeamDTO: MyTeamDTO, authUserId: string){
        
        const { name, lastName, nationalCode } = myTeamDTO;
        
        try {

            const myTeamUser = new MyTeamUser()
            myTeamUser.name = name;
            myTeamUser.lastName = lastName;
            myTeamUser.nationalCode = nationalCode;

            const authUser = new AuthUserEntity();
            authUser.id = authUserId;
            myTeamUser.user = authUser;

            return this.save(myTeamUser);

        } catch (err) {
            return err
        }
    }
       
});