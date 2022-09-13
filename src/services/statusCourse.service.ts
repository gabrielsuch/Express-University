import {Request} from "express"

import {AppDataSource} from "../data-source"
import {StatusCourse} from "../entities/statusCourse.entity"


class StatusCourseService {
    getAllStatusCourse = async () => {
        // AO RELACIONAR UM CURSO AO USUÁRIO, CRIAR AUTOMATICAMENTE O StatusCourse, COM O STATUS (INCOMPLETO), DURAÇÃO (0), CURSO RELACIONADO, E O ESTUDANTE RELACIONADO
        // FAZER PEGAR DO USUARIO ATUAL OS CURSOS RELACIONADOS À ELE

        const statusCourseRepository = AppDataSource.getRepository(StatusCourse)
        const statusCourses = await statusCourseRepository.find()

        return {status: 200, message: statusCourses}
        
    }
}


export default new StatusCourseService()