import { Router } from "express";
import { CategoriesRepository } from "../modules/repositories/CategoriesRepository";
import { PostgresCategoriesRepository } from "../modules/repositories/PostgresCategoriesRepository";
import { CreateCategoryService } from "../modules/services/CreateCategoryService";

const categoriesRoutes = Router();
//const categoriesRepository = new CategoriesRepository();
const categoriesRepository = new PostgresCategoriesRepository();

categoriesRoutes.post("/", (req, res) => {
    const { name, description } = req.body;
    const createCategoryService = new CreateCategoryService(categoriesRepository);
    createCategoryService.execute({name, description});

    return res.status(201).send();
});
categoriesRoutes.get("/", (req, res) => {
    const categories = categoriesRepository.list();

    return res.json({ categories });
});

export { categoriesRoutes };
