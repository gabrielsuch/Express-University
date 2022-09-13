import {Router} from "express"

import StatusCourseController from "../controllers/statusCourse.controller"


const route = Router()


const statusCourseRoute = () => {
    route.get("", StatusCourseController.getAllStatusCourse)

    return route
}


export default statusCourseRoute