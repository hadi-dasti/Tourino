import { AuthAdminDto } from './auth.admin.dto';
import { AuthAdminEntity } from './auth.admin.entity';
import { AppDataSource } from "../../dataSource";



// Repository for managing AuthAdminEntity
export const AuthAdminRepository = AppDataSource.getRepository(AuthAdminEntity).extend({

// Registers a new admin with the provided details
    async registerAdmin(authAdminDto: AuthAdminDto): Promise<AuthAdminEntity>{
        
        const { adminName, password, mobileNumber, email } = authAdminDto;

        try {
            const newAdmin = this.create({
                adminName,
                password,
                mobileNumber,
                email
            });
            
           return await this.save(newAdmin);
            
        } catch (err) {
            console.log(err)
            return err
        }
        
    }
})

