import { AppDataSource } from '../../dataSource';
import { UserGroupEntity } from './user.usergroup.entity';
import { UserGroupDto } from './user.usergroup.dto';


export const UserGroupRepository = AppDataSource.getRepository(UserGroupEntity).extend({
    
})


