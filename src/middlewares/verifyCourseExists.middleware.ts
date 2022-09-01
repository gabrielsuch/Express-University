import {Request, Response, NextFunction} from "express"

import {AppDataSource} from "../data-source"
import {Course} from "../entities/course.entity"


const verifyCourseExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const courseRepository = AppDataSource.getRepository(Course)
    const courseExists = await courseRepository.findOneBy({
        id: req.params.course_id
    }) 

    if(!courseExists) {
        return res.status(404).json({error: "Course not found."})
    }

    return next()
}


export default verifyCourseExistsMiddleware