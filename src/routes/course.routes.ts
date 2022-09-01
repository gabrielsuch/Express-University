import {Router} from "express"

import CourseController from "../controllers/course.controller"

import verifyTokenMiddleware from "../middlewares/verifyToken.middleware"
import verifyAdminPermissionMiddleware from "../middlewares/verifyAdminPermission.middleware"
import verifyCourseExistsMiddleware from "../middlewares/verifyCourseExists.middleware"


const route = Router()


const courseRoute = () => {
    route.get("/:course_id", verifyCourseExistsMiddleware, CourseController.getCourse)
    route.get("", CourseController.getAllCourses)
    route.post("", verifyTokenMiddleware, verifyAdminPermissionMiddleware, CourseController.createCourse)
    route.patch("/:course_id", verifyTokenMiddleware, verifyCourseExistsMiddleware, verifyAdminPermissionMiddleware, CourseController.updateCourse)
    route.delete("/:course_id", verifyTokenMiddleware, verifyCourseExistsMiddleware, verifyAdminPermissionMiddleware, CourseController.deleteCourse)

    return route
}


export default courseRoute