import { AppDataSource } from '../../dataSource';
import { AuthUserEntity } from './../authUser/auth.user.entity';
import { ProfileUserDTO } from './user.profileUser.dto';
import bcrypt from 'bcryptjs';



export const ProfileUserRepository = AppDataSource.getRepository(AuthUserEntity).extend({

    async updateProfileUser(profileUserDTO: ProfileUserDTO): Promise<AuthUserEntity> {
        
        const { id, nationalCode, password, fatherName, bloodCategory, city } = profileUserDTO;

        try {

            const authUser = await this.findOne({ where: { id } });

            if (!authUser) {
                throw new Error('User not found')
            }

            const users = this.create({
                nationalCode,
                password,
                fatherName,
                bloodCategory,
                city,
            });

            if (password) {
                const salt = await bcrypt.genSalt(10);
                const hahsPassword = await bcrypt.hash(password, salt);
                users.password = hahsPassword;
            };


            if (!users) {
                throw new Error('User not found')
            }

            return users
            
        } catch (err) {
           console.log(err)
            return err
        }
    }
});