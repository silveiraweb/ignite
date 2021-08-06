import { Category } from "../model/Category"
import { ICategoriesRepository, ICreateCategoryDTO } from "./ICategoriesRepository";

class PostgresCategoriesRepository implements  ICategoriesRepository {
    findByName(name:  string): Category {
        console.log(name)
        return  null
        //throw new Error("Method not implemented.");
    }
    list(): Category[] {
        //return  null
        throw new Error("Method not implemented.");
    }
    create({name, description}: ICreateCategoryDTO): void {

        console.log(name, description)
        
        //throw new Error("Method not implemented.");
    }
}


export { PostgresCategoriesRepository }