import { Module } from '@nestjs/common';
import { GroupSearchService } from './group.search.service';
import { GroupSearchController } from './group.search.controller';

Module({
  providers: [GroupSearchService],
  controllers: [GroupSearchController],
});

export class GroupSerachModule {}
