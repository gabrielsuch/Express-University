import {Request, Response, NextFunction} from "express"

import {AppDataSource} from "../data-source"
import {Student} from "../entities/student.entity"


const verifyStudentExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const studentRepository = AppDataSource.getRepository(Student)
    const studentExists = await studentRepository.findOneBy({
        email: req.decoded
    })

    if(!studentExists) {
        return res.status(404).json({error: "Student not found."})
    }

    return next()
}


export default verifyStudentExistsMiddleware