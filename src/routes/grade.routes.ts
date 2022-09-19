import {Router} from "express"

import GradeController from "../controllers/grade.controller"

import verifyTokenMiddleware from "../middlewares/verifyToken.middleware"
import verifyAdminPermissionMiddleware from "../middlewares/verifyAdminPermission.middleware"
import verifyGradeExistsMiddleware from "../middlewares/verifyGradeExists.middleware"
import verifyCourseExistsMiddleware from "../middlewares/verifyCourseExists.middleware"


const route = Router()


const gradeRoute = () => {
    route.get("/:grade_id", verifyGradeExistsMiddleware, GradeController.getGrade)
    route.get("", GradeController.getGrades)
    route.post("", verifyTokenMiddleware, verifyAdminPermissionMiddleware, GradeController.createGrade)
    route.post("/assign/:grade_id/:course_id", verifyTokenMiddleware, verifyAdminPermissionMiddleware, verifyGradeExistsMiddleware, verifyCourseExistsMiddleware, GradeController.assignGradeToCourse)
    route.patch("/:grade_id", verifyTokenMiddleware, verifyGradeExistsMiddleware, verifyAdminPermissionMiddleware, GradeController.updateGrade)
    route.delete("/:grade_id", verifyTokenMiddleware, verifyGradeExistsMiddleware, verifyAdminPermissionMiddleware, GradeController.deleteGrade)

    return route
}


export default gradeRoute