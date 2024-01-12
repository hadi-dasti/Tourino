import { Module } from '@nestjs/common';
import { AuthUserModule } from './auth/authuser.module';
import { GroupSearchCodeModule } from './group-search/group.search.code.module';


@Module({
  imports:[
    AuthUserModule,
    GroupSearchCodeModule,
  ]
})
export class UserModule {}
