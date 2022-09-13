import {Request, Response} from "express"

import StatusCourseService from "../services/statusCourse.service"


class StatusCourseController {
    getAllStatusCourse = async (req: Request, res: Response) => {
        const statusCourse = await StatusCourseService.getAllStatusCourse()  

        return res.status(statusCourse.status).json(statusCourse.message)
    }
}


export default new StatusCourseController()