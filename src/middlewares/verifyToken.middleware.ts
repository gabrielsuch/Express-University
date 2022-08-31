import {Request, Response, NextFunction} from "express"

import {IDecoded} from "../interfaces/index"

import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()


const verifyTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1]
    
    if(!token) {
        return res.status(400).json({error: "Missing Authorization Token."})
    }

    jwt.verify(token as string, String(process.env.SECRET_KEY), (err: any, decoded: IDecoded) => {
        if(err) {
            return res.status(400).json({error: "Invalid Token."})
        }

        req.decoded = decoded.email
        
        return next()
    })
}


export default verifyTokenMiddleware