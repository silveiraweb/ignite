import {Request, Response} from "express";
import CreateCourseService from "./CreateCourseService";

export function createCourse(req: Request, res: Response) {
    CreateCourseService.execute({
        name: "Node.js", 
        educator: "Educator"
    });
    CreateCourseService.execute({
        name: "js", 
        educator: "Javascript",
        duration:10
    });
    CreateCourseService.execute({
        name: "HTML",
        educator: "Pedro",
        duration: 16
    });
    return res.send();
}