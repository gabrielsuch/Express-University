import {Request, Response} from "express"

import EmployeeService from "../services/employee.service"


class EmployeeController {
    createEmployee = async (req: Request, res: Response) => {
        const employee = await EmployeeService.createEmployee(req)

        return res.status(employee.status).json(employee.message)
    }

    login = async (req: Request, res: Response) => {
        const employee = await EmployeeService.login(req)

        return res.status(employee.status).json(employee.message)
    }
}


export default new EmployeeController()