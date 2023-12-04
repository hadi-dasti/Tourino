import { Request, Response } from 'express';
import { UserGroupRepository } from './user.usergroup.repository';
import { UserGroupDto } from './user.usergroup.dto';



export class UserGroupController{

    private readonly userGroupRepository = UserGroupRepository;

      /**
   * Handles the GET request to retrieve all user groups.
   * @param req The request object.
   * @param res The response object.
   * @returns The response containing the list of user groups.
   */

    public async getUserGroup(req: Request, res: Response): Promise<Response> {
        
        try {

            const buildUserGroup = await this.userGroupRepository.find();

            if (!buildUserGroup || buildUserGroup.length === 0) {
                
                return res.status(404).json({
                    success: false,
                    msg: "Error Not Found UserGroup"
                });
            }
            // Return the successful response with the list of user groups
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

     /**
   * Handles the POST request to create a new user group.
   * @param req The request object.
   * @param res The response object.
   * @returns The response containing the created user group.
   */

    public async buildUserGroup(req: Request, res: Response): Promise<Response> {
        
        const userGroupDto: UserGroupDto = req.body;

        try {
            // Create a new user group using the provided data
            const newUserGroup = await this.userGroupRepository.buildUsergroup(userGroupDto);

            if (!newUserGroup) {
                return res.status(404).json({
                    success: false,
                    msg : "Failed to create usergroup"
                })
            }

            return res.status(201).json({
                success: true,
                data: { codeGroup: newUserGroup.codeGroup },
                msg : "User group created successfully"
            })

        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                msg :"Internal Server Error"
            })

        }
    }

    public async getGroupUserId(req: Request, res: Response): Promise<Response>{
        
        const { usergroupId } = req.params;

        try {
            // Find the user group entity with the specified id
            const newUserGroup = await this.userGroupRepository.findOne({ where: { id: usergroupId } });

            if (!newUserGroup) {
                return res.status(404).json({
                    success: false,
                    msg : "Usergroup not found"
                })
            }

             // If user group is found, return a success response with the codeGroup
            return res.status(200).json({
                success: true,
                msg: "Usergroup retrieved successfully with id",
                data: {
                    codeGroup: newUserGroup.codeGroup
                }
            });
            
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                msg: "Internal Server Error"
            });
        }
    }

    public async searchCodeGroup(req: Request, res: Response): Promise<Response>{

        const { codeGroup } = req.params;

        if (typeof codeGroup !== 'string') {
            return res.status(400).json({
                msg: 'Invalid codeGroup parameter'
            });
        }

        try {
            

            const userGroup= this.userGroupRepository.findByCodeGroup(codeGroup);

            if (!userGroup) {
                return res.status(404).json({
                    success: false,
                    msg : "Error not found"
                })
            }

            return res.status(200).json({
                success: true,
                msg: "successfully retrive search codegroup"
            });

        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                msg : "Internal Server Error"
            })
        }
    }
}