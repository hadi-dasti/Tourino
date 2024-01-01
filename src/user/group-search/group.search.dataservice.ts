import { Injectable, InternalServerErrorException } from '@nestjs/common';

Injectable();
export class DataService {
  private codeGroups: string[] = ['Group A', 'Group B', 'Group C'];
  async searchGroup(query: string): Promise<string[]> {
    const filterResult = this.codeGroups.filter((result) =>
      result.toLowerCase().includes(query.toLocaleLowerCase()),
    );
    if (!filterResult) {
      throw new InternalServerErrorException('Field search group');
    }
    return filterResult;
  }
}
