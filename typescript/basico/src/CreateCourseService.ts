
interface Course {
    name: string;
    duration?: number; // ? atributo opcional
    educator: string;
}


class CreateCourseService {

    execute({name, duration = 8, educator}: Course) {
        console.log(name, duration, educator);
    }
}
export default new CreateCourseService;