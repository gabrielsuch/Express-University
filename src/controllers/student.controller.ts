import {Request, Response} from "express"

import StudentService from "../services/student.service"


class StudentController {
    getCurrentUser = async (req: Request, res: Response) => {
        const user = await StudentService.getCurrentUser(req)

        return res.status(user.status).json(user.message)
    }

    getUsers = async (req: Request, res: Response) => {
        const user = await StudentService.getUsers()

        return res.status(user.status).json(user.message)
    }

    createUser = async (req: Request, res: Response) => {
        const user = await StudentService.createUser(req)

        return res.status(user.status).json(user.message)
    }

    updateUser = async (req: Request, res: Response) => {
        const user = await StudentService.updateUser(req)

        return res.status(user.status).json(user.message)
    }
    
    deleteUser = async (req: Request, res: Response) => {
        const user = await StudentService.deleteUser(req)

        return res.status(user.status).json(user.message)
    }

    login = async (req: Request, res: Response) => {
        const user = await StudentService.login(req)

        return res.status(user.status).json(user.message)
    }
}


export default new StudentController()