import {Router} from "express"

import EmployeeController from "../controllers/employee.controller"


const route = Router()


const employeeRoute = () => {
    route.post("", EmployeeController.createEmployee)
    route.post("/login", EmployeeController.login)

    return route
}


export default employeeRoute