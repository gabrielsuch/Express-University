import {Request, Response, NextFunction} from "express"

import {AppDataSource} from "../data-source"
import {User} from "../entities/user.entity"


const verifyAdminPermissionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOneBy({
        email: req.decoded
    })

    if(!user || !user.is_adm) {
        return res.status(401).json({error: "Missing Admin Permission."})
    }

    return next()
}


export default verifyAdminPermissionMiddleware