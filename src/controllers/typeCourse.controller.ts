import {Request, Response} from "express"

import TypeCourseService from "../services/typeCourse.service"


class TypeCourseController {
    getTypeCourse = async (req: Request, res: Response) => {
        const typeCourse = await TypeCourseService.getTypeCourse(req)

        return res.status(200).json(typeCourse)
    }

    getAllTypeCourses = async (req: Request, res: Response) => {
        const typeCourses = await TypeCourseService.getAllTypeCourses()

        return res.status(200).json(typeCourses)
    }

    createTypeCourse = async (req: Request, res: Response) => {
        const typeCourse = await TypeCourseService.createTypeCourse(req)

        return res.status(201).json(typeCourse)
    }

    updateTypeCourse = async (req: Request, res: Response) => {  
        const typeCourse = await TypeCourseService.updateTypeCourse(req)

        return res.status(200).json(typeCourse)
    }
    
    deleteTypeCourse = async (req: Request, res: Response) => {
        const typeCourse = await TypeCourseService.deleteTypeCourse(req)

        return res.status(typeCourse.status).json(typeCourse.message)
    }
}


export default new TypeCourseController()