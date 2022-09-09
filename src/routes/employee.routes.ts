import {Router} from "express"

import EmployeeController from "../controllers/employee.controller"

import verifyTokenMiddleware from "../middlewares/verifyToken.middleware"
import verifyAdminPermissionMiddleware from "../middlewares/verifyAdminPermission.middleware"


const route = Router()


const employeeRoute = () => {
    route.get("", verifyTokenMiddleware, EmployeeController.getEmployee)
    route.get("/all", verifyTokenMiddleware, verifyAdminPermissionMiddleware, EmployeeController.getAllEmployees)
    route.post("", EmployeeController.createEmployee)
    route.post("/login", EmployeeController.login)

    return route
}


export default employeeRoute