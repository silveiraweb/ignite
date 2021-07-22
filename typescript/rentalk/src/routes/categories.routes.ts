import { Router } from "express";
import { CategoriesRepository } from "../repositories/CategoriesRepository";
import { CreateCategoryServie } from "../services/CreateCategoryService";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (req, res) => {
    const { name, description } = req.body;
    const createCategoryServie = new CreateCategoryServie(categoriesRepository);
    createCategoryServie.execute({name, description});

    return res.status(201).send();
});
categoriesRoutes.get("/", (req, res) => {
    const categories = categoriesRepository.list();

    return res.json({ categories });
});

export { categoriesRoutes };
