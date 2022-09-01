import {Request, Response} from "express"

import TypeCourseService from "../services/typeCourse.service"


class TypeCourseController {
    getTypeCourse = async (req: Request, res: Response) => {
        const typeCourse = await TypeCourseService.getTypeCourse(req)

        return res.status(typeCourse.status).json(typeCourse.message)
    }

    getAllTypeCourses = async (req: Request, res: Response) => {
        const typeCourses = await TypeCourseService.getAllTypeCourses()

        return res.status(typeCourses.status).json(typeCourses.message)
    }

    createTypeCourse = async (req: Request, res: Response) => {
        const typeCourse = await TypeCourseService.createTypeCourse(req)

        return res.status(typeCourse.status).json(typeCourse.message)
    }

    updateTypeCourse = async (req: Request, res: Response) => {  
        const typeCourse = await TypeCourseService.updateTypeCourse(req)

        return res.status(typeCourse.status).json(typeCourse.message)
    }
    
    deleteTypeCourse = async (req: Request, res: Response) => {
        const typeCourse = await TypeCourseService.deleteTypeCourse(req)

        return res.status(typeCourse.status).json(typeCourse.message)
    }
}


export default new TypeCourseController()