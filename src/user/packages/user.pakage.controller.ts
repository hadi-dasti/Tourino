import { Request, Response } from "express";
import { PackageRepository } from './user.package.repository';
import { PackageDTO } from './user.package.DTO';
import { PackageEntity } from './user.package.entity';



export class PackageController{

    private readonly PackageRepository = PackageRepository;

    public async getPackageUser(req:Request, res:Response):Promise<Response> {
        
        try {

            const getAllPackages = await this.PackageRepository.find();

            if (!getAllPackages) {
                return res.status(404).json({
                    success: false,
                    msg: "Error not found"
                });
            }

            return res.status(200).json({
                success: true,
                msg: "Successfully get all package pages"
            });

        } catch (err) {
            return res.status(500).json({
                success: false,
                msg: "Internal Server Error"
            });
        }
       
    }

    public async getOnePackageUser(req: Request, res: Response): Promise<Response>{
        
        const { packageId } = req.params;
        try {
            const getOnePackage = await this.PackageRepository.findOneBy({ id: packageId });

            if (!getOnePackage) {
                return res.status(404).json({
                    success: false,
                    msg: "Error not Found of get one package"
                });
            }

            return res.status(200).json({
                success: true,
                msg :"Successfully get one package"
            })
        } catch (err) {
            return res.status(500).json({
                success: false,
                msg: "Internal Server Error"
            });
        }
    }

    public async buildPackageUser(req: Request, res: Response): Promise<Response> {
        
        const packageDTO: PackageDTO = req.body;

        try {
            const newPackage = this.PackageRepository.buildPackageRepository(packageDTO);

            if (!newPackage) {
                return res.status(404).json({
                    success: false,
                    msg: "Error not found create package"
                });
            }

            await this.PackageRepository.save(newPackage);

            return res.status(201).json({
                success: true,
                msg : "successfully create package"
            })

        } catch (err) {
            return res.status(500).json({
                success: false,
                msg :"Internal Server Error"
            })
        }
    }

    public async updatePackageUser(req: Request, res: Response): Promise<Response>{
        
        const { packageId } = req.params;
        const PackageDTO: PackageDTO = req.body;

        try {

            const packageUserId = await this.PackageRepository.findOneBy({ id: packageId });

            if (!packageUserId) {
                return res.status(404).json({
                    success: false,
                    msg: "Error not found package with id"
                });
            }

            await this.PackageRepository.createQueryBuilder()
                .update(PackageEntity)
                .set(PackageDTO)
                .where("id = :id", { id: packageId })
                .execute()
            
            this.PackageRepository.merge(packageUserId,PackageDTO);

            const newPackageUser = await this.PackageRepository.save(packageUserId);
            
            if (!newPackageUser) {
                return res.status(404).json({
                    success: false,
                    msg: "Error not Found"
                });
            }

            return res.status(200).json({
                success: true,
                msg :"update successfully package"
            })

        } catch (err) {
            return res.status(500).json({
                success: false,
                msg: "Internal Server Error"
            });
        }
    }
    
    public async deletePackageUser(req:Request,res:Response):Promise<void> {
        const { packageId } = req.params;
        try {
            const deletePackage = await this.PackageRepository.delete({ id: packageId });

            if (deletePackage) {
                res.status(200).json({
                    success: true,
                    msg: "Package delete successfully"
                });
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({
                success: false,
                msg: "Internal Server Error"
            });
        }
    };
};