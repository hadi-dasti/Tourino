import { Request, Response } from "express";
import { MyTeamDTO } from './user.myTeam.dto';
import {MyTeamUserRepoitory} from './user.myTeam.repository'
import { ProfileUserRepository } from '../profileUser/user.profileUser.repository';
import { MyTeamUser } from "./user.myTeam.entity";



export class MyTeamController{
    
    private readonly myTeamUserRepoitory = MyTeamUserRepoitory;
    private readonly profileUserRepository = ProfileUserRepository;
    
    
    public async buildMyTeamUser(req:Request,res:Response):Promise<Response> {
        
        const myTeamDTO: MyTeamDTO = req.body;
        const profileUserId: string = req.params.authUserId;

        try {

            const newMyTeamUser = await this.myTeamUserRepoitory.buildMyTeamUser(myTeamDTO,profileUserId);

            if (!newMyTeamUser) {
               return  res.status(400).json({
                    success: false,
                    msg: "Error not found for create myTeamUser"
                });
            }
            
            return  res.status(201).json({
                success: true,
                msg: "successfully build myTeamUser"
            });

        } catch (err) {
            console.error(err)
           return res.status(500).json({
                success: false,
                msg : "Internal Serevr Error"
            })

        }
    };

    public async getAllMyTeamUser(req: Request, res: Response): Promise<Response> {
        
        try {
            const getAllMyTeam = await this.myTeamUserRepoitory.find()
            
            if (!getAllMyTeam) {
                return res.status(404).json({
                    success: false,
                    msg: "Not Foud for getMyTeam"
                });
            }

            return res.status(200).json({
                success: true,
                msg: "get all myTeam"
            });

        } catch (err) {
            console.error(err)
            return res.status(500).json({
                success: false,
                msg: "Iternal Server Error"
            });
        };
    };

    public async getOneMyTeamUser(req: Request, res: Response): Promise<Response>{
        
        const myteamuserid = req.params;

        try {
            const getOneMyTeam = await this.myTeamUserRepoitory.findOne({ where: myteamuserid });

            if (!getOneMyTeam) {
                return res.status(404).json({
                    success: false,
                    msg: "Error not found one myTeamUser"
                });
            }

            return res.status(200).json({
                success: true,
                msg: "Success get one myTeamUser"
            });

        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                msg: "Internal Server Error"
            });
        }
    }

    public async updateMyTeamUser(req: Request, res: Response):Promise<Response> {
        
        const { myteamuserid } = req.params;
        const myTeamDTO: MyTeamDTO = req.body;

        try {

            const myTeamUserRepository = await this.myTeamUserRepoitory.findOneBy({ id: myteamuserid });

            if (!myTeamUserRepository) {
                return res.status(400).json({
                    success: false,
                    msg: "bad request"
                });
            }

            await this.myTeamUserRepoitory.createQueryBuilder()
                .update(MyTeamUser)
                .set(myTeamDTO)
                .where("id = :id", { id: myteamuserid })
                .execute();
            
            this.myTeamUserRepoitory.merge(myTeamUserRepository, myTeamDTO);
            
            const updatedMyTeamUser = await this.myTeamUserRepoitory.save(myTeamUserRepository);
            
            return res.status(200).json({
                success: true,
                data: { updatedMyTeamUser },
                msg: "successfully update myteamnewuser"
            });
            
        } catch (err) {
            return res.status(500).json({
                success: false,
                msg: "Internal Server Error"
            });
        }
    };

    public async deleteMyTeamUser(req: Request, res: Response): Promise<void>{
        const { myteamuserid } = req.params;
        try {

            const deleteMyTeamUserId = await this.myTeamUserRepoitory
                .createQueryBuilder('myTeamUser')
                .delete()
                .from(MyTeamUser)
                .where("id = :id", { id: myteamuserid })
                .execute();
            
            if (!deleteMyTeamUserId) {
                res.status(400).json({
                    success: false,
                    msg: "Bad Request "
                });
            }

             res.status(200).json({
                success: true,
                msg: " successfully delete mytteamuser "
            });
                
        } catch (err) {
            console.log(err)
            res.status(500).json({
                success: false,
                msg: "Internal Server Error"
            });
        }
    }

    public async sentMyTeamUser(req: Request, res: Response):Promise<Response> {
        
        const { myTeamId } = req.body
        const { profileUserId } = req.params;
        
        try {

            const profileUser = await this.profileUserRepository.findOneBy({ id: profileUserId });

            if (!profileUser) {
                return res.status(404).json({
                    success: false,
                    message: `ProfileUser with id ${profileUserId} not found`
                });
            }
            
            const myTeamUser = await this.myTeamUserRepoitory.findOneBy({ id: myTeamId });

            if (myTeamUser!== myTeamId) {
                return res.status(404).json({
                    success : false,
                    message: `One or more MyTeamUsers not found`
                });
            };

            profileUser.myTeamUsers = myTeamUser;
            await this.profileUserRepository.save(profileUser);

            return res.status(201).json({
                success: true,
                msg :"successfully save information  data myteam to table profileUser"
            })

        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                msg :"Internal Server Error"
            })
        }
    }

}