import {Router} from "express"

import CourseController from "../controllers/course.controller"

import verifyTokenMiddleware from "../middlewares/verifyToken.middleware"
import verifyAdminPermissionMiddleware from "../middlewares/verifyAdminPermission.middleware"
import verifyCourseExistsMiddleware from "../middlewares/verifyCourseExists.middleware"
import validateSchemaMiddleware from "../middlewares/validateSchema.middleware"
import validateUUIDMiddleware from "../middlewares/validateUUID.middleware"

import {createCourseSchema, updateCourseSchema} from "../schemas/course.schema"


const route = Router()


const courseRoute = () => {
    route.get("/:course_id", validateUUIDMiddleware, verifyCourseExistsMiddleware, CourseController.getCourse)
    route.get("", CourseController.getAllCourses)
    route.post("", verifyTokenMiddleware, validateSchemaMiddleware(createCourseSchema), verifyAdminPermissionMiddleware, CourseController.createCourse)
    route.patch("/:course_id", validateUUIDMiddleware, verifyTokenMiddleware, validateSchemaMiddleware(updateCourseSchema), verifyCourseExistsMiddleware, verifyAdminPermissionMiddleware, CourseController.updateCourse)
    route.delete("/:course_id", validateUUIDMiddleware, verifyTokenMiddleware, verifyCourseExistsMiddleware, verifyAdminPermissionMiddleware, CourseController.deleteCourse)

    return route
}


export default courseRoute