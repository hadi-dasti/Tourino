import { AppDataSource } from '../../dataSource';
import { ProgramProposalEntity } from './user.programproposal.entity';
import { ProgramProposalDto } from './user.programproposal.dto';


export const ProgramProposalRepository = AppDataSource.getRepository(ProgramProposalEntity).extend({
    
    async getProgramProposoal(programProposalDto: ProgramProposalDto): Promise<ProgramProposalEntity[]>{
        
        try {
            const { programName,
                programType,
                destination,
                safetyTips,
                suggestedDate,
                description,
            } = programProposalDto;
            
            
            const programProposals = await this.find({
        where: { programName, programType, destination, safetyTips, suggestedDate, description },
            });
            return programProposals

          
        } catch (err) {
            console.error(err);
            throw new Error('An error occurred while fetching program proposals')     
        }
    },

    async createProgramProposal(programProposalDto: ProgramProposalDto):Promise<ProgramProposalEntity> {
        
        try {
            const { programName,
                programType,
                destination,
                safetyTips,
                suggestedDate,
                description,
            } = programProposalDto;

            const newProgramProposal = this.create({
                programName,
                programType,
                destination,
                safetyTips,
                suggestedDate,
                description,
            });

            await this.save(newProgramProposal);

            return newProgramProposal
        } catch (err) {
            return  err
        }
    }
             
});