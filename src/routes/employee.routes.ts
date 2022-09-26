import {Router} from "express"

import EmployeeController from "../controllers/employee.controller"

import verifyTokenMiddleware from "../middlewares/verifyToken.middleware"
import verifyAdminPermissionMiddleware from "../middlewares/verifyAdminPermission.middleware"
import validateSchemaMiddleware from "../middlewares/validateSchema.middleware"

import {createEmploeeSchema, updateEmploeeSchema, loginEmploeeSchema} from "../schemas/employee.schema"


const route = Router()


const employeeRoute = () => {
    route.get("/current", verifyTokenMiddleware, EmployeeController.getCurrentEmployee)
    route.get("/:id", verifyTokenMiddleware, EmployeeController.getEmployee)
    route.get("", verifyTokenMiddleware, verifyAdminPermissionMiddleware, EmployeeController.getAllEmployees)
    
    // route.post("", verifyTokenMiddleware, verifyAdminPermissionMiddleware, EmployeeController.createEmployee)
    route.post("", validateSchemaMiddleware(createEmploeeSchema), EmployeeController.createEmployee)
    route.post("/login", validateSchemaMiddleware(loginEmploeeSchema), EmployeeController.login)
    route.patch("/:id", verifyTokenMiddleware, validateSchemaMiddleware(updateEmploeeSchema), verifyAdminPermissionMiddleware, EmployeeController.updateEmployee)
    route.delete("/:id", verifyTokenMiddleware, verifyAdminPermissionMiddleware, EmployeeController.deleteEmployee)

    return route
}


export default employeeRoute