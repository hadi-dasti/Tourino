import { Module } from '@nestjs/common';
import { GroupSearchCodeService } from './group.search.code.service';
import {GroupSearchCodeController } from './group.search.controller';



@Module({
    providers: [GroupSearchCodeService],
    controllers: [GroupSearchCodeController]
})
    
    
export class GroupSearchCodeModule {}
