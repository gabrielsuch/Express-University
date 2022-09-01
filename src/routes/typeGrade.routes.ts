import {Router} from "express"

import TypeGradeController from "../controllers/typeGrade.controller"

import verifyTokenMiddleware from "../middlewares/verifyToken.middleware"
import verifyAdminPermissionMiddleware from "../middlewares/verifyAdminPermission.middleware"
import verifyTypeGradeExistsMiddleware from "../middlewares/verifyTypeGradeExists.middleware"


const route = Router()


const typeGrade = () => {
    route.get("/:typeGrade_id", verifyTypeGradeExistsMiddleware, TypeGradeController.getTypeGrade)
    route.get("", TypeGradeController.getAllTypeGrades)
    route.post("", verifyTokenMiddleware, verifyAdminPermissionMiddleware, TypeGradeController.createTypeGrade)
    route.patch("/:typeGrade_id", verifyTokenMiddleware, verifyTypeGradeExistsMiddleware, verifyAdminPermissionMiddleware, TypeGradeController.updateTypeGrade)
    route.delete("/:typeGrade_id", verifyTokenMiddleware, verifyTypeGradeExistsMiddleware, verifyAdminPermissionMiddleware, TypeGradeController.deleteTypeGrade)

    return route
}


export default typeGrade