import { Request,Response } from "express";
import { ProfileUserDTO } from './user.profileUser.dto';
import { profileUserRepository } from './user.profileUser.repository';



export class ProfileUseController{

    private readonly profileUserRepository = profileUserRepository
    
    public async buildProfileUser(req: Request, res: Response): Promise<void> {
        
        const profileUserDTO: ProfileUserDTO = req.body;
        const file = req.file;
        console.log(file);

        try {
            if (!profileUserDTO) {
                res.status(404).json({
                    success: false,
                    msg:""                 
                })

                await this.profileUserRepository.updateProfileUser(profileUserDTO)

              res.status(201).json({
                    success: true,
                    msg:"successfully update profile"
                 })
            }
        } catch (err) {
            console.log(err)
        }
    }

}