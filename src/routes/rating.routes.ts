import {Router} from "express"

import RatingController from "../controllers/rating.controller"

import verifyTokenMiddleware from "../middlewares/verifyToken.middleware"
import verifyCourseExistsMiddleware from "../middlewares/verifyCourseExists.middleware"
import verifyStudentExistsMiddleware from "../middlewares/verifyStudentExists.middleware"
import verifyRatingExistsMiddleware from "../middlewares/verifyRatingExists.middleware"
import validateSchemaMiddleware from "../middlewares/validateSchema.middleware"
import validateUUIDMiddleware from "../middlewares/validateUUID.middleware"

import {createRatingSchema} from "../schemas/rating.schema"


const route = Router()


const ratingRoute = () => {
    route.get("/:rating_id", validateUUIDMiddleware, verifyRatingExistsMiddleware, RatingController.getRating)
    route.get("", RatingController.getRatings)
    route.post("/:course_id", validateUUIDMiddleware, verifyTokenMiddleware, validateSchemaMiddleware(createRatingSchema), verifyCourseExistsMiddleware, verifyStudentExistsMiddleware, RatingController.createRating)
    route.delete("/:rating_id", validateUUIDMiddleware, verifyTokenMiddleware, verifyRatingExistsMiddleware, RatingController.deleteRating)

    return route
}


export default ratingRoute