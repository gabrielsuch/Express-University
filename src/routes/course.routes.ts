import {Router} from "express"

import CourseController from "../controllers/course.controller"

import verifyTokenMiddleware from "../middlewares/verifyToken.middleware"
import verifyAdminPermissionMiddleware from "../middlewares/verifyAdminPermission.middleware"


const route = Router()


const courseRoute = () => {
    route.get("/:course_id", CourseController.getCourse)
    route.get("", CourseController.getAllCourses)
    route.post("", verifyTokenMiddleware, verifyAdminPermissionMiddleware, CourseController.createCourse)
    route.patch("/:course_id", verifyTokenMiddleware, verifyAdminPermissionMiddleware, CourseController.updateCourse)
    route.delete("/:course_id", verifyTokenMiddleware, verifyAdminPermissionMiddleware, CourseController.deleteCourse)

    return route
}


export default courseRoute