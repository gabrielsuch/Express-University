import {Router} from "express"

import EmployeeController from "../controllers/employee.controller"

import verifyTokenMiddleware from "../middlewares/verifyToken.middleware"
import verifyAdminPermissionMiddleware from "../middlewares/verifyAdminPermission.middleware"


const route = Router()


const employeeRoute = () => {
    route.get("", verifyTokenMiddleware, EmployeeController.getCurrentEmployee)
    route.get("/:id", verifyTokenMiddleware, EmployeeController.getEmployee)

    // A ROTA /all, ESTÁ DANDO CONFLITO COM O PARAMS DA ROTA ACIMA /\
    // route.get("/all", verifyTokenMiddleware, verifyAdminPermissionMiddleware, EmployeeController.getAllEmployees)
    
    // route.post("", verifyTokenMiddleware, verifyAdminPermissionMiddleware, EmployeeController.createEmployee)
    route.post("", EmployeeController.createEmployee)
    route.post("/login", EmployeeController.login)
    route.patch("/:id", verifyTokenMiddleware, verifyAdminPermissionMiddleware, EmployeeController.updateEmployee)
    route.delete("/:id", verifyTokenMiddleware, verifyAdminPermissionMiddleware, EmployeeController.deleteEmployee)

    return route
}


export default employeeRoute