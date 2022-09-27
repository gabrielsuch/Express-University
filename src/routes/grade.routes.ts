import {Router} from "express"

import GradeController from "../controllers/grade.controller"

import verifyTokenMiddleware from "../middlewares/verifyToken.middleware"
import verifyAdminPermissionMiddleware from "../middlewares/verifyAdminPermission.middleware"
import verifyGradeExistsMiddleware from "../middlewares/verifyGradeExists.middleware"
import verifyCourseExistsMiddleware from "../middlewares/verifyCourseExists.middleware"
import validateSchemaMiddleware from "../middlewares/validateSchema.middleware"
import validateUUIDMiddleware from "../middlewares/validateUUID.middleware"

import {createGradeSchema, updateGradeSchema} from "../schemas/grade.schema"


const route = Router()


const gradeRoute = () => {
    route.get("/:grade_id", validateUUIDMiddleware, verifyGradeExistsMiddleware, GradeController.getGrade)
    route.get("", GradeController.getGrades)
    route.post("", verifyTokenMiddleware, validateSchemaMiddleware(createGradeSchema), verifyAdminPermissionMiddleware, GradeController.createGrade)
    route.post("/assign/:grade_id/:course_id", validateUUIDMiddleware, verifyTokenMiddleware, verifyAdminPermissionMiddleware, verifyGradeExistsMiddleware, verifyCourseExistsMiddleware, GradeController.assignGradeToCourse)
    route.patch("/:grade_id", validateUUIDMiddleware, verifyTokenMiddleware, validateSchemaMiddleware(updateGradeSchema), verifyGradeExistsMiddleware, verifyAdminPermissionMiddleware, GradeController.updateGrade)
    route.delete("/:grade_id", validateUUIDMiddleware, verifyTokenMiddleware, verifyGradeExistsMiddleware, verifyAdminPermissionMiddleware, GradeController.deleteGrade)

    return route
}


export default gradeRoute