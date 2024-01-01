import { Controller, Get, Param, Query } from '@nestjs/common';
import { GroupSearchService } from './group.search.service';

Controller('/api/v1/user/search-group');
export class GroupSearchController {
  constructor(private groupSearchService: GroupSearchService) {}

  @Get('/:codegroup')
  public async searchCodeGroup(@Param() codeGroup: string): Promise<string[]> {
    return this.groupSearchService.searchGroup(codeGroup);
  }
}
