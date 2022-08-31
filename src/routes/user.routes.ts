import {Router} from "express"

import UserController from "../controllers/user.controller"

import verifyTokenMiddleware from "../middlewares/verifyToken.middleware"
import verifyUserExistsMiddleware from "../middlewares/verifyUserExists.middleware"
import verifyAdminPermissionMiddleware from "../middlewares/verifyAdminPermission.middleware"


const route = Router()


const userRoute = () => {
    route.get("", verifyTokenMiddleware, verifyUserExistsMiddleware, UserController.getCurrentUser)
    route.get("/all", verifyTokenMiddleware, verifyAdminPermissionMiddleware, UserController.getUsers)
    route.post("", UserController.createUser)
    route.post("/login", UserController.login)
    route.patch("", verifyTokenMiddleware, verifyUserExistsMiddleware, UserController.updateUser)
    route.delete("", verifyTokenMiddleware, verifyUserExistsMiddleware, UserController.deleteUser)

    return route
}


export default userRoute