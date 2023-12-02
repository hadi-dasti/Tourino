import { Request, Response } from "express";
import { ImageProgaramEntity } from './image.programproposal.entity';
import { ImageDto } from './image.programpropoosal.dto';
import { ProgramProposalRepository } from './../user.programproposal.repository';


export class ImageProgramProposal{

    private readonly programProposalRepository = ProgramProposalRepository;

    public async buildImageProgramProposalController(req:Request,res:Response):Promise<Response> {
        
        const imageDto: ImageDto = req.body;

        try {
            const imageProgramProposal = new ImageProgaramEntity();
            imageProgramProposal.image = imageDto.image;

            const buildImageProgramProposal = await this.programProposalRepository.createProgramProposal(imageProgramProposal);

            if (!buildImageProgramProposal) {
                return res.status(404).json({
                    success: false,
                    msg :"Error not found"
                })
            }

            return res.status(200).json({
                success: true,
                msg : "Successfully upload image in entity "
            })

        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                msg : "Iternal Server Error"
            })
        }

    }
}