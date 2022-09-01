import {Request, Response, NextFunction} from "express"

import {AppDataSource} from "../data-source"
import {TypeGrade} from "../entities/typeGrade.entity"


const verifyTypeGradeExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const typeGradeRepository = AppDataSource.getRepository(TypeGrade)
    const typeGradeExists = await typeGradeRepository.findOneBy({
        id: req.params.typeGrade_id
    })

    if(!typeGradeExists) {
        return res.status(404).json({error: "Type Grade not found."})
    }

    return next()
}


export default verifyTypeGradeExistsMiddleware