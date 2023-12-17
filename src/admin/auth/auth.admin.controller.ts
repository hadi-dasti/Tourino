import { Body, Controller, Post } from '@nestjs/common';
import { AuthAdminService } from './auth.admin.service';
import { AuthAdminDto} from './auth.admin.dto';


@Controller('/api/v1/admin/auth-admin')
export class AuthAdminController{
    constructor(
        private authAdminService: AuthAdminService
    ){}
    
    @Post('/register')
    registerAdmin(@Body() authAdminDto: AuthAdminDto) {
        
        try {
            const buildAdmin = this.authAdminService.registerAdmin(authAdminDto);

            if (!buildAdmin) {
                console.log('Error not Foud Admin')
            }

            return buildAdmin;

        } catch (err) {

            console.log(err)
        }
    }

    @Post('/login')
    loginAdmin(@Body() authAdminDto: AuthAdminDto) {
        this.authAdminService.loginAdmin(authAdminDto)
    }
}