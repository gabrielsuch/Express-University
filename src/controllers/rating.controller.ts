import {Request, Response} from "express"

import RatingService from "../services/rating.service"


class RatingController {
    getRating = async (req: Request, res: Response) => {
        const rating = await RatingService.getRating(req)

        return res.status(200).json(rating)
    }

    getRatings = async (req: Request, res: Response) => {
        const ratings = await RatingService.getRatings()

        return res.status(200).json(ratings)
    }

    createRating = async (req: Request, res: Response) => {
        const rating = await RatingService.createRating(req)

        return res.status(201).json(rating)
    }

    deleteRating = async (req: Request, res: Response) => {
        const rating = await RatingService.deleteRating(req)

        return res.status(rating.status).json(rating.message)
    }
}


export default new RatingController()