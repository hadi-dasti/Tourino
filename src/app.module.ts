import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';
import { AdminModule } from './admin/admin.module';
import typeOrmConfig from './dataSource';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    ClientModule,
    AdminModule,
  ],
})
export class AppModule {}
