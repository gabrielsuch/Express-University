import {Express} from "express"

import userRoute from "./user.routes"


const registerRoutes = (app: Express) => {
    app.use("/user", userRoute())
}


export default registerRoutes