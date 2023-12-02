import { Request, Response } from 'express';
import { UserGroupRepository } from './user.usergroup.repository';
// import { UserGroupDto } from './user.usergroup.dto';



export class UserGroupController{

    private readonly userGroupRepository = UserGroupRepository;

    public async getUserGroup(req: Request, res: Response): Promise<Response> {
        
        try {
            const builUserGroup = await this.userGroupRepository.find();

            if (!builUserGroup && builUserGroup === 0) {
                
                return res.status(404).json({
                    success: false,
                    msg: "Error Not Found UserGroup"
                });
            }

            return res.status(200).json({
                success: true,
                msg: "Successfully get userGroup"
            });

        } catch (err) {
            return res.status(500).json({
                success: false,
                msg: "Internal Server Error"
            });
        }
    };
}