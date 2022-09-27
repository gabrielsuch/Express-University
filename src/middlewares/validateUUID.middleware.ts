import {Request, Response, NextFunction} from "express"

import {} from "uuid"


const validateUUIDMiddleware = (req: Request, res: Response, next: NextFunction) => {


    return next()
}


export default validateUUIDMiddleware