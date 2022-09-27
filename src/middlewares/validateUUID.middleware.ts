import {Request, Response, NextFunction} from "express"

import {validate, version} from "uuid"


const validateUUIDMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const validateUUID = Object.keys(req.params).map((key) => {
        return validate(req.params[key]) && version(req.params[key]) === 4
    })

    if(validateUUID.includes(false)) {
        return res.status(400).json({error: "Not a UUID type."})
    }

    return next()
}


export default validateUUIDMiddleware