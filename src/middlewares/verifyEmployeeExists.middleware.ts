import {Request, Response, NextFunction} from "express"

import {AppDataSource} from "../data-source"
import {Employee} from "../entities/employee.entity"


const verifyEmployeeExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const employeeRepository = AppDataSource.getRepository(Employee)
    const employeeExists = await employeeRepository.findOneBy({
        id: req.params.id
    })

    if(!employeeExists) {
        return res.status(404).json({error: "Employee not found."})
    }

    return next()
}


export default verifyEmployeeExistsMiddleware