import {Express} from "express"

import userRoute from "./user.routes"
import courseRoute from "./course.routes"


const registerRoutes = (app: Express) => {
    app.use("/user", userRoute())
    app.use("/course", courseRoute())
}


export default registerRoutes