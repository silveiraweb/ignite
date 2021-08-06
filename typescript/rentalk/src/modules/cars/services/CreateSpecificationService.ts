import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository"

interface IRequest {
    name: string;
    description: string;
}
class CreateSpecificationService {
    constructor(private specificationsRepository: ISpecificationsRepository) {
        
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