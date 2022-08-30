import {Request, Response} from "express"

import UserService from "../services/user.service"


class UserController {
    // getCurrentUser = async (req: Request, res: Response) => {

    // }

    getUsers = async (req: Request, res: Response) => {
        const user = await UserService.getUsers()

        return res.status(user.status).json(user.message)
    }

    createUser = async (req: Request, res: Response) => {
        const user = await UserService.createUser(req)

        return res.status(user.status).json(user.message)
    }

    login = async (req: Request, res: Response) => {
        const user = await UserService.login(req)

        return res.status(user.status).json(user.message)
    }
}


export default new UserController()