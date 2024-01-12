import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { GroupSearchCodeService } from './group.search.code.service';
import { GroupSearchCodeDto } from './group.search.code.dto';


@Controller('api/v1/user/group-search')
export class GroupSearchCodeController {
  constructor(private groupSearchCodeService: GroupSearchCodeService) {}

  @Get('')
  @HttpCode(200)
  public searchingCode(@Query() groupSearchCodeDto:GroupSearchCodeDto){
     return this.groupSearchCodeService.searchCodeGroup(groupSearchCodeDto)
  
  }
}
