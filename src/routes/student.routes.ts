import {Router} from "express"

import StudentController from "../controllers/student.controller"

import verifyTokenMiddleware from "../middlewares/verifyToken.middleware"
import verifyStudentExistsMiddleware from "../middlewares/verifyStudentExists.middleware"
import verifyAdminPermissionMiddleware from "../middlewares/verifyAdminPermission.middleware"


const route = Router()


const studentRoute = () => {
    route.get("", verifyTokenMiddleware, verifyStudentExistsMiddleware, StudentController.getCurrentUser)
    route.get("/all", verifyTokenMiddleware, verifyAdminPermissionMiddleware, StudentController.getUsers)
    route.post("", StudentController.createUser)
    route.post("/login", StudentController.login)
    route.patch("", verifyTokenMiddleware, verifyStudentExistsMiddleware, StudentController.updateUser)
    route.delete("", verifyTokenMiddleware, verifyStudentExistsMiddleware, StudentController.deleteUser)

    return route
}


export default studentRoute