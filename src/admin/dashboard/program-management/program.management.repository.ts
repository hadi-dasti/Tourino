import { ProgramManagementEntity } from './program.management.entity';
import { ProgramManagementDto } from './program.management.dto';
import { AppDataSource } from '../../../dataSource';


export const ProgramManagementRepository = AppDataSource.getRepository(ProgramManagementEntity).extend({})