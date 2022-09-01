import {Request, Response, NextFunction} from "express"

import {AppDataSource} from "../data-source"
import {TypeCourse} from "../entities/typeCourse.entity"


const verifyTypeCourseExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const typeCourseRepository = AppDataSource.getRepository(TypeCourse)
    const typeCourseExists = await typeCourseRepository.findOneBy({
        id: req.params.typeCourse_id
    })

    if(!typeCourseExists) {
        return res.status(404).json({error: "Type Course not found."})
    }

    return next()
}


export default verifyTypeCourseExistsMiddleware