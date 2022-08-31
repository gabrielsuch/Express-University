import {Router} from "express"

import UserController from "../controllers/user.controller"

import verifyTokenMiddlware from "../middlewares/verifyToken.middleware"


const route = Router()


const userRoute = () => {
    // route.get("", UserController.getCurrentUser)
    route.get("", verifyTokenMiddlware, UserController.getUsers)
    route.post("", UserController.createUser)
    route.post("/login", UserController.login)

    return route
}


export default userRoute