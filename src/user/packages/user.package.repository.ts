import { AppDataSource } from '../../dataSource';
import { PackageDTO } from './user.package.DTO';
import { PackageEntity } from './user.package.entity';

export const PackageRepository = AppDataSource.getRepository(PackageEntity).extend({

    buildPackageRepository(packageDTO: PackageDTO) {
        
        const { name, description, cost } = packageDTO;

        return this.create({
            name, description, cost
        });
    }
});

