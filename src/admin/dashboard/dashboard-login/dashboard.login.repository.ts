import { DashboardLoginEntity } from './dashboard.login.entity';
import { AppDataSource } from '../../../dataSource';
import { DashboardLoginDto } from './dashboard.login.dto';

export const DashboardLoginRepository = AppDataSource.getTreeRepository(DashboardLoginEntity).extend({

    async DashboardLogin(dashboardLoginDto: DashboardLoginDto): Promise<DashboardLoginEntity> {
        
        const newDashboardlogin = this.create(dashboardLoginDto);

        if (!newDashboardlogin) {
            console.log('Error for building Dashboard admin')
        }

        return await this.save(newDashboardlogin);
     }
})