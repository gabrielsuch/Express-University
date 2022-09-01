import {Request, Response} from "express"

import CourseService from "../services/course.service"


class CourseController {
    getCourse = async (req: Request, res: Response) => {
        const course = await CourseService.getCourse(req)

        return res.status(course.status).json(course.message)
    }

    getAllCourses = async (req: Request, res: Response) => {
        const courses = await CourseService.getAllCourses()

        return res.status(courses.status).json(courses.message)
    }

    createCourse = async (req: Request, res: Response) => {
        const course = await CourseService.createCourse(req)

        return res.status(course.status).json(course.message)
    }

    updateCourse = async (req: Request, res: Response) => {
        const course = await CourseService.updateCourse(req)

        return res.status(course.status).json(course.message)
    }

    deleteCourse = async (req: Request, res: Response) => {
        const course = await CourseService.deleteCourse(req)

        return res.status(course.status).json(course.message)
    }
}


export default new CourseController()