import {Request, Response} from "express"

import StudentService from "../services/student.service"


class StudentController {
    getCurrentStudent = async (req: Request, res: Response) => {
        const student = await StudentService.getCurrentStudent(req)

        return res.status(200).json(student)
    }

    getStudents = async (req: Request, res: Response) => {
        const students = await StudentService.getStudents()

        return res.status(200).json(students)
    }

    createStudent = async (req: Request, res: Response) => {
        const student = await StudentService.createStudent(req)

        return res.status(201).json(student)
    }

    updateCurrentStudent = async (req: Request, res: Response) => {
        const student = await StudentService.updateCurrentStudent(req)

        return res.status(200).json(student)
    }
    
    deleteCurrentStudent = async (req: Request, res: Response) => {
        const student = await StudentService.deleteCurrentStudent(req)

        return res.status(student.status).json(student.message)
    }

    loginStudent = async (req: Request, res: Response) => {
        const student = await StudentService.loginStudent(req)

        return res.status(student.status).json(student.message)
    }

    joinCourse = async (req: Request, res: Response) => {
        const course = await StudentService.joinCourse(req)

        return res.status(course.status).json(course.message)
    }
}


export default new StudentController()