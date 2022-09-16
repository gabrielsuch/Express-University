import {Request, Response} from "express"

import RatingService from "../services/rating.service"


class RatingController {
    getRating = async (req: Request, res: Response) => {
        const rating = await RatingService.getRating(req)

        return res.status(rating.status).json(rating.message)
    }

    getRatings = async (req: Request, res: Response) => {
        const ratings = await RatingService.getRatings()

        return res.status(ratings.status).json(ratings.message)
    }

    createRating = async (req: Request, res: Response) => {
        const rating = await RatingService.createRating(req)

        return res.status(rating.status).json(rating.message)
    }

    deleteRating = async (req: Request, res: Response) => {
        const rating = await RatingService.deleteRating(req)

        return res.status(rating.status).json(rating.message)
    }
}


export default new RatingController()