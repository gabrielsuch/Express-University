import {Router} from "express"

import TypeCourseController from "../controllers/typeCourse.controller"

import verifyTokenMiddleware from "../middlewares/verifyToken.middleware"
import verifyAdminPermissionMiddleware from "../middlewares/verifyAdminPermission.middleware"
import verifyTypeCourseExistsMiddleware from "../middlewares/verifyTypeCourseExists.middleware"
import validateSchemaMiddleware from "../middlewares/validateSchema.middleware"
import validateUUIDMiddleware from "../middlewares/validateUUID.middleware"

import {createTypeCourseSchema, updateTypeCourseSchema} from "../schemas/typeCourse.schema"


const route = Router()


const typeCourseRoute = () => {
    route.get("/:typeCourse_id", validateUUIDMiddleware, verifyTypeCourseExistsMiddleware, TypeCourseController.getTypeCourse)
    route.get("", TypeCourseController.getAllTypeCourses)
    route.post("", verifyTokenMiddleware, validateSchemaMiddleware(createTypeCourseSchema), verifyAdminPermissionMiddleware, TypeCourseController.createTypeCourse)
    route.patch("/:typeCourse_id", validateUUIDMiddleware, verifyTokenMiddleware, validateSchemaMiddleware(updateTypeCourseSchema), verifyTypeCourseExistsMiddleware, verifyAdminPermissionMiddleware, TypeCourseController.updateTypeCourse)
    route.delete("/:typeCourse_id", validateUUIDMiddleware, verifyTokenMiddleware, verifyTypeCourseExistsMiddleware, verifyAdminPermissionMiddleware, TypeCourseController.deleteTypeCourse)

    return route
}


export default typeCourseRoute