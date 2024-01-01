import { Module } from '@nestjs/common';
import { AuthUserModule } from './auth/authuser.module';
import { GroupSerachModule } from './group-search/group.search.module';

@Module({
  imports: [AuthUserModule, GroupSerachModule],
})
export class UserModule {}
