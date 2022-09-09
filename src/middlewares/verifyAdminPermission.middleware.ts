import {Request, Response, NextFunction} from "express"

import {AppDataSource} from "../data-source"
import {Employee} from "../entities/employee.entity"


const verifyAdminPermissionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = AppDataSource.getRepository(Employee)
    const user = await userRepository.findOneBy({
        email: req.decoded
    })

    if(!user || !user.is_adm) {
        return res.status(401).json({error: "Missing Admin Permission."})
    }

    return next()
}


export default verifyAdminPermissionMiddleware