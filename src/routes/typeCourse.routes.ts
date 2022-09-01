import {Router} from "express"

import TypeCourseController from "../controllers/typeCourse.controller"

import verifyTokenMiddleware from "../middlewares/verifyToken.middleware"
import verifyAdminPermissionMiddleware from "../middlewares/verifyAdminPermission.middleware"
import verifyTypeCourseExistsMiddleware from "../middlewares/verifyTypeCourseExists.middleware"


const route = Router()


const typeCourseRoute = () => {
    route.get("/:typeCourse_id", verifyTypeCourseExistsMiddleware, TypeCourseController.getTypeCourse)
    route.get("", TypeCourseController.getAllTypeCourses)
    route.post("", verifyTokenMiddleware, verifyAdminPermissionMiddleware, TypeCourseController.createTypeCourse)
    route.patch("/:typeCourse_id", verifyTokenMiddleware, verifyTypeCourseExistsMiddleware, verifyAdminPermissionMiddleware, TypeCourseController.updateTypeCourse)
    route.delete("/:typeCourse_id", verifyTokenMiddleware, verifyTypeCourseExistsMiddleware, verifyAdminPermissionMiddleware, TypeCourseController.deleteTypeCourse)

    return route
}


export default typeCourseRoute