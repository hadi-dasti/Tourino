import { Controller, Post, Body } from "@nestjs/common";
import { RegisterClientService } from './registerClient.service';
import { RegiterClientDto } from './registerClient.dto';
import { RegisterClientEntity } from './registerClient.entity';

@Controller('/api/v1/client/register-client')
export class RegisterClientController{

    constructor(private registerClientService: RegisterClientService) { }
    
    @Post('/')
    async registerCliet(@Body() regiterClientDto: RegiterClientDto): Promise<RegisterClientEntity> {
        return this.registerClientService.registerClient(regiterClientDto)
    };

}