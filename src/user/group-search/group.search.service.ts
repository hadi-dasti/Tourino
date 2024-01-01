import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataService } from './group.search.dataservice';

@Injectable()
export class GroupSearchService {
  constructor(private readonly dataService: DataService) {}

  async searchGroup(query: string): Promise<string[]> {
    try {
      const searchResult: string[] = await this.dataService.searchGroup(query);

      if (searchResult.length === 0) {
        throw new NotFoundException('Code Group Not Found');
      }

      return searchResult;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Search Code Group failed');
    }
  }
}
