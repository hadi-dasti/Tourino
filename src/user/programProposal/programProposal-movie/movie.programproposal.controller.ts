import { Request, Response } from "express";
import { MovieDto } from './movie.programproposal.dto';
import { Movie } from './movie.programproposal.entity';
import { ProgramProposalRepository } from './../user.programproposal.repository';


export class MovieProgramProposal{
     
    private readonly programProposalRepository = ProgramProposalRepository;

    // constructor(programProposalRepository: typeof ProgramProposalRepository) {
    //     this.programProposalRepository = programProposalRepository;
    // }

    public async buildMovieProgramProposalController(req: Request, res: Response): Promise<Response> {
        
        const movieDto: MovieDto = req.body;

        try {
            const movie = new Movie();
            movie.movie = movieDto.movie;

            const createFieldUploadMovie = await this.programProposalRepository.createProgramProposal(movie);

            if (!createFieldUploadMovie) {
                return res.status(404).json({
                    success: false,
                    msg: "Error not Found"
                });
            }

            return res.status(201).json({
                success: true,
                msg: "SuccessFully Create upload movie in ProgramProposal"
            });

        } catch (err) {
            return res.status(500).json({
                success: false,
                msg : "Internal Server Error"
            })
        }
    }
}


