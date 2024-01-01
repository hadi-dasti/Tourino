import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '0083499970',
  database: 'torino',
  entities: [],
  synchronize: true, // For development, set to false in production
  autoLoadEntities: true,
};

export default typeOrmConfig;
