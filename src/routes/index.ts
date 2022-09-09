import {Express} from "express"

import studentRoute from "./student.routes"
import employeeRoute from "./employee.routes"
import courseRoute from "./course.routes"
import gradeRoute from "./grade.routes"
import typeCourseRoute from "./typeCourse.routes"


const registerRoutes = (app: Express) => {
    app.use("/student", studentRoute())
    app.use("/employee", employeeRoute())
    app.use("/course", courseRoute())
    app.use("/grade", gradeRoute())
    app.use("/typeCourse", typeCourseRoute())
}


export default registerRoutes