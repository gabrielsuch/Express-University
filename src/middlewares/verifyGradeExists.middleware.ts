import {Request, Response, NextFunction} from "express"

import {AppDataSource} from "../data-source"
import {Grade} from "../entities/grade.entity"


const verifyGradeExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const gradeRepository = AppDataSource.getRepository(Grade)
    const gradeExists = await gradeRepository.findOneBy({
        id: req.params.grade_id
    }) 

    if(!gradeExists) {
        return res.status(404).json({error: "Grade not found."})
    }

    return next()
}


export default verifyGradeExistsMiddleware