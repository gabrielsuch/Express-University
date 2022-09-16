import {Request, Response, NextFunction} from "express"

import {AppDataSource} from "../data-source"
import {Rating} from "../entities/rating.entity"


const verifyRatingExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const ratingRepository = AppDataSource.getRepository(Rating)
    const rating = await ratingRepository.findOneBy({
        id: req.params.rating_id
    })

    if(!rating) {
        return res.status(404).json({error: "Rating not found."})
    }

    return next()
}


export default verifyRatingExistsMiddleware