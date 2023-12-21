import 'dotenv/config';
import { DataSource } from 'typeorm';
import { AuthUserEntity } from './user/authUser/auth.user.entity';
import { MyTeamUser } from './user/myTeam/user.myTeam.entity';
import { PackageEntity } from './user/packages/user.package.entity';
import { ProgramProposalEntity } from './user/programProposal/user.programproposal.entity';
import { UserGroupEntity } from './user/usergroup/user.usergroup.entity';
import { ClientRegisterEntity } from './client/register/client.register.entity';
import { AuthAdminEntity } from './admin/auth/auth.admin.entity';
import { DashboardLoginEntity } from './admin/dashboard/dashboard-login/dashboard.login.entity';

   // Create a new DataSource instance
export const AppDataSource = new DataSource({
   type: "postgres",
   host: process.env.DB_HOST as string,
   port: process.env.DB_PORT as unknown as number,
   username: process.env.DB_USERNAME as string,
   password: process.env.DB_PASSWORD as string,
   database: process.env.DB_NAME as string,
   entities:
      [
         AuthUserEntity,
         MyTeamUser,
         PackageEntity,
         ProgramProposalEntity,
         UserGroupEntity,
         ClientRegisterEntity,
         AuthAdminEntity,
         DashboardLoginEntity 
      ],
   synchronize: true,
   logging: false
});
   
AppDataSource.initialize()
   .then(() => console.log('start to work with pg database') )
   .catch(err => console.log('Error to connect database', err));
     




