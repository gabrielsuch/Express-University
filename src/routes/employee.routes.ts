import {Router} from "express"

import EmployeeController from "../controllers/employee.controller"

import verifyTokenMiddleware from "../middlewares/verifyToken.middleware"
import verifyAdminPermissionMiddleware from "../middlewares/verifyAdminPermission.middleware"


const route = Router()


const employeeRoute = () => {
    route.get("/current", verifyTokenMiddleware, EmployeeController.getCurrentEmployee)
    route.get("/:id", verifyTokenMiddleware, EmployeeController.getEmployee)
    route.get("", verifyTokenMiddleware, verifyAdminPermissionMiddleware, EmployeeController.getAllEmployees)
    
    // route.post("", verifyTokenMiddleware, verifyAdminPermissionMiddleware, EmployeeController.createEmployee)
    route.post("", EmployeeController.createEmployee)
    route.post("/login", EmployeeController.login)
    route.patch("/:id", verifyTokenMiddleware, verifyAdminPermissionMiddleware, EmployeeController.updateEmployee)
    route.delete("/:id", verifyTokenMiddleware, verifyAdminPermissionMiddleware, EmployeeController.deleteEmployee)

    return route
}


export default employeeRoute