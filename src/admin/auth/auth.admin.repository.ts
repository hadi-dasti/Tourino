import { AuthAdminDto } from './auth.admin.dto';
import { AuthAdminEntity } from './auth.admin.entity';
import { AppDataSource } from '../../dataSource';
import * as bcrypt from 'bcryptjs';

// Repository for managing AuthAdminEntity
export const AuthAdminRepository = AppDataSource.getRepository(AuthAdminEntity).extend({

    // Registers a new admin with the provided details

    async registerAdmin(authAdminDto: AuthAdminDto): Promise<AuthAdminEntity> {

        const { adminName, password, mobileNumber, email } = authAdminDto;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newAdmin = this.create({
                adminName,
                password :hashedPassword,
                mobileNumber,
                email,
            });

            return await this.save(newAdmin);

        } catch (err) {
            console.log(err);
            return err;
        }
    },

    async loginAdmin(authAdminDto: AuthAdminDto): Promise<AuthAdminEntity | undefined> {
      
        const { adminName, password } = authAdminDto;

        try {
        
            const checkNameAdmin = await this.findOne({
                where: {
                    adminName
                }
            });

            if (!checkNameAdmin) {
                console.log('Error: Admin not found');
                return undefined;
            };

            const isPasswordValid = await bcrypt.compare(password, checkNameAdmin?.password);
            
            if (!isPasswordValid) {
                console.log('Error: Incorrect password');
                 return undefined
            };

            
            return checkNameAdmin!;

        } catch (err) {
            console.error('Error occurred while logging in admin:', err);
            return undefined
        }
    }
});
