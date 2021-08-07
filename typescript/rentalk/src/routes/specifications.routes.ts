import { Router } from "express";

import { SpeificationRepository } from "../modules/cars/repositories/SpecificationRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

const specificationsRoutes = Router();
const specificationRepository = new SpeificationRepository();

specificationsRoutes.post('/', (req, res) => {
    const {name, description } =  req.body;
    const createSpecificationService = new CreateSpecificationService(specificationRepository);
    createSpecificationService.execute({ name, description });
    return res.status(201).send();
})
specificationsRoutes.get("/", (req, res) => {
    const specifications = specificationRepository.list();

    return res.json({ specifications }).status(200);
});

export { specificationsRoutes };
