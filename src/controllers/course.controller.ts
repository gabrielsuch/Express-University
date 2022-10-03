import {Request, Response} from "express"

import CourseService from "../services/course.service"


class CourseController {
    getCourse = async (req: Request, res: Response) => {
        const course = await CourseService.getCourse(req)

        return res.status(200).json(course)
    }

    getAllCourses = async (req: Request, res: Response) => {
        const courses = await CourseService.getAllCourses()

        return res.status(200).json(courses)
    }

    createCourse = async (req: Request, res: Response) => {
        const course = await CourseService.createCourse(req)

        return res.status(201).json(course)
    }

    updateCourse = async (req: Request, res: Response) => {
        const course = await CourseService.updateCourse(req)

        return res.status(200).json(course)
    }

    deleteCourse = async (req: Request, res: Response) => {
        const course = await CourseService.deleteCourse(req)

        return res.status(course.status).json(course.message)
    }
}


export default new CourseController()