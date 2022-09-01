import {Router} from "express"

import GradeController from "../controllers/grade.controller"

import verifyTokenMiddleware from "../middlewares/verifyToken.middleware"
import verifyAdminPermissionMiddleware from "../middlewares/verifyAdminPermission.middleware"


const route = Router()


const gradeRoute = () => {
    route.get("/:grade_id", GradeController.getGrade)
    route.get("", GradeController.getGrades)
    route.post("", verifyTokenMiddleware, verifyAdminPermissionMiddleware, GradeController.createGrade)
    route.patch("/:grade_id", verifyTokenMiddleware, verifyAdminPermissionMiddleware, GradeController.updateGrade)
    route.delete("/:grade_id", verifyTokenMiddleware, verifyAdminPermissionMiddleware, GradeController.deleteGrade)

    return route
}


export default gradeRoute