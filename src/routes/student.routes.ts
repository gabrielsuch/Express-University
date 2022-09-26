import {Router} from "express"

import StudentController from "../controllers/student.controller"

import verifyTokenMiddleware from "../middlewares/verifyToken.middleware"
import verifyStudentExistsMiddleware from "../middlewares/verifyStudentExists.middleware"
import verifyAdminPermissionMiddleware from "../middlewares/verifyAdminPermission.middleware"
import verifyCourseExistsMiddleware from "../middlewares/verifyCourseExists.middleware"
import validateSchemaMiddleware from "../middlewares/validateSchema.middleware"

import {createStudentSchema, updateStudentSchema, loginStudentSchema} from "../schemas/student.schema"


const route = Router()


const studentRoute = () => {
    route.get("/current", verifyTokenMiddleware, verifyStudentExistsMiddleware, StudentController.getCurrentUser)
    route.get("", verifyTokenMiddleware, verifyAdminPermissionMiddleware, StudentController.getUsers)
    route.post("", validateSchemaMiddleware(createStudentSchema), StudentController.createUser)
    route.post("/login", validateSchemaMiddleware(loginStudentSchema), StudentController.login)
    route.post("/course/:course_id", verifyTokenMiddleware, verifyStudentExistsMiddleware, verifyCourseExistsMiddleware, StudentController.joinCourse)
    route.patch("", verifyTokenMiddleware, validateSchemaMiddleware(updateStudentSchema), verifyStudentExistsMiddleware, StudentController.updateUser)
    route.delete("", verifyTokenMiddleware, verifyStudentExistsMiddleware, StudentController.deleteUser)

    return route
}


export default studentRoute