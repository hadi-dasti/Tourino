import { AppDataSource } from '../../dataSource';
import { UserGroupEntity } from './user.usergroup.entity';
import { UserGroupDto } from './user.usergroup.dto';
import { generateCode } from './user.usergroup.helper';

export const UserGroupRepository = AppDataSource.getRepository(UserGroupEntity).extend({

    /**
   * Builds a new userGroup entity and saves it to the database.
   * @param userGroupDto The data for creating the user group.
   * @returns The created user group entity.
    */
    
    async buildUsergroup(userGroupDto: UserGroupDto): Promise<UserGroupEntity> {

        const { nameGroup, image, userId } = userGroupDto;

        try {

            // Create a new userGroup entity with the provided data
            const newUsergroup = this.create({
                nameGroup,
                image,
                codeGroup: generateCode(),
                user: { id: userId }
            });

            // Save the new user group entity to the database
            await this.save(newUsergroup);

            return newUsergroup;

        } catch (err) {

            // Handle any errors that occur during the process
            console.log(err);
            throw new Error("Failed to create userGroup");
        }
    },

     /**
     * Finds a user group by codeGroup.
     * @param codeGroup The codeGroup to search for.
     * @returns The user group entity if found, otherwise null.
     */

    async findByCodeGroup(codeGroup: string): Promise<UserGroupEntity | null> {
        
        try {
            const userGroup = await this.findOne({ where: { codeGroup } });

            if (userGroup?.codeGroup !== codeGroup) {
                 throw new Error('Retrieved userGroup has a different codeGroup');
            }
            return userGroup;
        } catch (err) {
            console.error(err);
            throw new Error(`Error finding user group by codeGroup: ${codeGroup}`)
        } 
    }

});


