import {Router} from "express"

import StudentController from "../controllers/student.controller"

import verifyTokenMiddleware from "../middlewares/verifyToken.middleware"
import verifyStudentExistsMiddleware from "../middlewares/verifyStudentExists.middleware"
import verifyAdminPermissionMiddleware from "../middlewares/verifyAdminPermission.middleware"
import verifyCourseExistsMiddleware from "../middlewares/verifyCourseExists.middleware"
import validateSchemaMiddleware from "../middlewares/validateSchema.middleware"
import validateUUIDMiddleware from "../middlewares/validateUUID.middleware"

import {createStudentSchema, updateStudentSchema, loginStudentSchema} from "../schemas/student.schema"


const route = Router()


const studentRoute = () => {
    route.get("/current", verifyTokenMiddleware, verifyStudentExistsMiddleware, StudentController.getCurrentStudent)
    route.get("", verifyTokenMiddleware, verifyAdminPermissionMiddleware, StudentController.getStudents)
    route.post("", validateSchemaMiddleware(createStudentSchema), StudentController.createStudent)
    route.post("/login", validateSchemaMiddleware(loginStudentSchema), StudentController.loginStudent)
    route.post("/course/:course_id", validateUUIDMiddleware, verifyTokenMiddleware, verifyStudentExistsMiddleware, verifyCourseExistsMiddleware, StudentController.joinCourse)
    route.patch("", verifyTokenMiddleware, validateSchemaMiddleware(updateStudentSchema), verifyStudentExistsMiddleware, StudentController.updateCurrentStudent)
    route.delete("", verifyTokenMiddleware, verifyStudentExistsMiddleware, StudentController.deleteCurrentStudent)

    return route
}


export default studentRoute