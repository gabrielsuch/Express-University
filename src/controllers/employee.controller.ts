import {Request, Response} from "express"

import EmployeeService from "../services/employee.service"


class EmployeeController {
    getCurrentEmployee = async (req: Request, res: Response) => {
        const currentEmployee = await EmployeeService.getCurrentEmployee(req)

        return res.status(currentEmployee.status).json(currentEmployee.message)
    }

    getEmployee = async (req: Request, res: Response) => {
        const employee = await EmployeeService.getEmployee(req)

        return res.status(employee.status).json(employee.message)
    }

    getAllEmployees = async (req: Request, res: Response) => {
        const employees = await EmployeeService.getAllEmployees()

        return res.status(employees.status).json(employees.message)
    }

    createEmployee = async (req: Request, res: Response) => {
        const employee = await EmployeeService.createEmployee(req)

        return res.status(employee.status).json(employee.message)
    }

    updateEmployee = async (req: Request, res: Response) => {
        const employee = await EmployeeService.updateEmployee(req)

        return res.status(employee.status).json(employee.message)
    }

    deleteEmployee = async (req: Request, res: Response) => {
        const employee = await EmployeeService.deleteEmployee(req)

        return res.status(employee.status).json(employee.message)
    }

    login = async (req: Request, res: Response) => {
        const employee = await EmployeeService.login(req)

        return res.status(employee.status).json(employee.message)
    }
}


export default new EmployeeController()