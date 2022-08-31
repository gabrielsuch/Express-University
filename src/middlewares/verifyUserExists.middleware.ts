import {Request, Response, NextFunction} from "express"

import {AppDataSource} from "../data-source"
import {User} from "../entities/user.entity"


const verifyUserExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = AppDataSource.getRepository(User)
    const userExists = await userRepository.findOneBy({
        email: req.decoded
    })

    if(!userExists) {
        return res.status(404).json({error: "User not found."})
    }

    return next()
}


export default verifyUserExistsMiddleware