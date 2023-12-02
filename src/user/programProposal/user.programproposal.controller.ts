import { Request, Response } from 'express';
import { ProgramProposalRepository } from './user.programproposal.repository';
import { ProgramProposalDto } from './user.programproposal.dto';


export class ProgramProposal{

    private readonly programProposalRepository = ProgramProposalRepository;

    public async getProgramProposalController(req: Request, res: Response): Promise<Response>{

        try {
            
            const newProgramProposal = this.programProposalRepository.getProgramProposoal 

            if (!newProgramProposal || newProgramProposal.length === 0) {
                return res.status(404).json({
                    success: false,
                    msg : "No program proposals found"
                })
            }

            return res.status(200).json({
                success: true,
                data :newProgramProposal ,
                msg: "Program proposals retrieved successfully"
            });

        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                msg: "Internal Server Errro"
            })
        }
    }

    public async buildProgramProposalController(req: Request, res: Response): Promise<Response> {
        
        const programProposalDto: ProgramProposalDto = req.body;
        
        try {
            if (!programProposalDto.programName || !programProposalDto.programType || !programProposalDto.destination || !programProposalDto.safetyTips || !programProposalDto.suggestedDate || !programProposalDto.description) {
                return res.status(400).json({
                    success: false,
                    msg: "All fields are required to build a program proposal"
                });
            }

            const buildProgramProposal = await this.programProposalRepository.createProgramProposal(programProposalDto);

            return res.status(201).json({
                success: true,
                data: buildProgramProposal,
                msg : "Successfully build ProgramProposal"
            })

        } catch (err) {
            return res.status(500).json({
                success: false,
                msg :"Internal Server Error"
            })
        }
    }
}