import { Request, Response } from "express";
import { MapDto } from './map.programproposal.dto';
import { Map } from './map.programproposal.entity';
import { ProgramProposalRepository } from './../user.programproposal.repository';


export class MapProgramProposal{
    
    private readonly programProposalRepository = ProgramProposalRepository;
   

    public async getMapProgramProposalController(req:Request,res:Response){
      
       
    }

    public async mapProgramProposoalController(req:Request,res:Response):Promise<Response> {
        
        const mapDto: MapDto = req.body;

        try {

            const map = new Map();
            map.map = mapDto.map;
            map.latitude = mapDto.latitude;
            map.longitude = mapDto.longitude;

            const buildMap = this.programProposalRepository.createProgramProposal(map);

            if (!buildMap) {
                return res.status(404).json({
                    success: false,
                    msg: "Error not Found of map"
                });
            }

            return res.status(201).json({
                success: true,
                msg: "Successfully set map of Geographical coordinates"
            });

        } catch (err) {
            return res.status(500).json({
                success: false,
                msg : "Internal Serevr Error"
            })
        }
    }

}