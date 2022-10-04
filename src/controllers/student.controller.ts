import {Request, Response} from "express"

import StudentService from "../services/student.service"


class StudentController {
    getCurrentStudent = async (req: Request, res: Response) => {
        const user = await StudentService.getCurrentStudent(req)

        return res.status(200).json(user)
    }

    getStudents = async (req: Request, res: Response) => {
        const user = await StudentService.getStudents()

        return res.status(200).json(user)
    }

    createStudent = async (req: Request, res: Response) => {
        const user = await StudentService.createStudent(req)

        return res.status(201).json(user)
    }

    updateCurrentStudent = async (req: Request, res: Response) => {
        const user = await StudentService.updateCurrentStudent(req)

        return res.status(200).json(user)
    }
    
    deleteCurrentStudent = async (req: Request, res: Response) => {
        const user = await StudentService.deleteCurrentStudent(req)

        return res.status(user.status).json(user.message)
    }

    loginStudent = async (req: Request, res: Response) => {
        const user = await StudentService.loginStudent(req)

        return res.status(user.status).json(user.message)
    }

    joinCourse = async (req: Request, res: Response) => {
        const course = await StudentService.joinCourse(req)

        return res.status(course.status).json(course.message)
    }
}


export default new StudentController()