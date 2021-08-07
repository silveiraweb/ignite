import { ISpecificationRepository } from "../repositories/ISpecificationRepository"

interface IRequest {
    name: string;
    description: string;
}
class CreateSpecificationService {
    constructor(private specificationsRepository: ISpecificationRepository) {
        
    }

    execute({name, description}: IRequest): void{
        const specifiationAlreadyExists =  this.specificationsRepository.findByName(name)
        this.specificationsRepository.create({
            name,
            description,
        })
        
    }
}

export { CreateSpecificationService, IRequest }