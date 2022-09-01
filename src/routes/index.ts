import {Express} from "express"

import userRoute from "./user.routes"
import courseRoute from "./course.routes"
import gradeRoute from "./grade.routes"
import typeCourseRoute from "./typeCourse.routes"


const registerRoutes = (app: Express) => {
    app.use("/user", userRoute())
    app.use("/course", courseRoute())
    app.use("/grade", gradeRoute())
    app.use("/typeCourse", typeCourseRoute())
}


export default registerRoutes