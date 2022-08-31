import {Request, Response, NextFunction} from "express"

import jwt from "jsonwebtoken"


const verifyTokenMiddlware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers?.authorization.split(" ")[1]
    
    if(!token) {
        return res.status(400).json({error: "Missing Authorization Token."})
    }

    jwt.verify(token, String(process.env.SECRET_KEY), (err, decoded) => {
        if(err) {
            return res.status(400).json({error: "Invalid Token."})
        }

        console.log(decoded)
        
        return next()
    })
}


export default verifyTokenMiddlware