import {Express} from "express"

import userRoute from "./user.routes"
import courseRoute from "./course.routes"
import gradeRoute from "./grade.routes"
import typeGradeRoute from "./typeGrade.routes"


const registerRoutes = (app: Express) => {
    app.use("/user", userRoute())
    app.use("/course", courseRoute())
    app.use("/grade", gradeRoute())
    app.use("/typeGrade", typeGradeRoute())
}


export default registerRoutes