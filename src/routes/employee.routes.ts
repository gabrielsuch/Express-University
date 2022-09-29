import {Router} from "express"

import EmployeeController from "../controllers/employee.controller"

import verifyTokenMiddleware from "../middlewares/verifyToken.middleware"
import verifyAdminPermissionMiddleware from "../middlewares/verifyAdminPermission.middleware"
import validateSchemaMiddleware from "../middlewares/validateSchema.middleware"
import validateUUIDMiddleware from "../middlewares/validateUUID.middleware"
import verifyEmployeeExistsMiddleware from "../middlewares/verifyEmployeeExists.middleware"

import {createEmploeeSchema, updateEmploeeSchema, loginEmploeeSchema} from "../schemas/employee.schema"


const route = Router()


const employeeRoute = () => {
    route.get("/current", verifyTokenMiddleware, EmployeeController.getCurrentEmployee)
    route.get("/:id", validateUUIDMiddleware, verifyTokenMiddleware, EmployeeController.getEmployee)
    route.get("", verifyTokenMiddleware, verifyAdminPermissionMiddleware, EmployeeController.getAllEmployees)
    
    // route.post("", verifyTokenMiddleware, verifyAdminPermissionMiddleware, EmployeeController.createEmployee)
    route.post("", validateSchemaMiddleware(createEmploeeSchema), EmployeeController.createEmployee)
    route.post("/login", validateSchemaMiddleware(loginEmploeeSchema), EmployeeController.login)
    route.patch("/:id", validateUUIDMiddleware, verifyTokenMiddleware, validateSchemaMiddleware(updateEmploeeSchema), verifyAdminPermissionMiddleware, verifyEmployeeExistsMiddleware, EmployeeController.updateEmployee)
    route.delete("/:id", validateUUIDMiddleware, verifyTokenMiddleware, verifyAdminPermissionMiddleware, verifyEmployeeExistsMiddleware, EmployeeController.deleteEmployee)

    return route
}


export default employeeRoute