import { Injectable, NotFoundException } from "@nestjs/common";
import { GroupSearchCodeDto } from "./group.search.code.dto";



@Injectable()
export class GroupSearchCodeService{

    private readonly groupSearchCode = ["code1", "code2", "code3"];

    searchCodeGroup(groupSearchCodeDto:GroupSearchCodeDto): string{
        
        const { codeGroupSearch } = groupSearchCodeDto;
        

       if (codeGroupSearch.length===0) {
        throw new NotFoundException('codeGroup cannot be empty');
    }
         
       if (!this.groupSearchCode.includes(codeGroupSearch)) {
        throw new NotFoundException('Code group not found');
    }
            
        return codeGroupSearch
    }
}