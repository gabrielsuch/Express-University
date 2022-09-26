import {Express} from "express"

import {Student} from "../../entities/student.entity"
import {Employee} from "../../entities/employee.entity"
import {Course} from "../../entities/course.entity"
import {Grade} from "../../entities/grade.entity"
import {Rating} from "../../entities/rating.entity"
import {StatusCourse} from "../../entities/statusCourse.entity"
import {StatusGrade} from "../../entities/statusGrade.entity"
import {TypeCourse} from "../../entities/typeCourse.entity"


declare global {
    namespace Express {
        interface Request {
            decoded: string
            validated: Student | Employee | Course | Grade | Rating | StatusCourse | StatusGrade | TypeCourse
        }
    }
}