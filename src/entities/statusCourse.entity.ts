import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"


import {Course} from "./course.entity"
import {Student} from "./student.entity"


enum StatusCourseRole {
    COMPLETO = "Completo",
    INCOMPLETO = "Incompleto"
}


@Entity()
export class StatusCourse {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        type: "enum",
        enum: StatusCourseRole,
        default: StatusCourseRole.INCOMPLETO
    })
    status: StatusCourseRole

    @Column({
        type: "float"
    }) 
    duration: number

    @ManyToOne(() => Course, (course) => course.statusCourse, {
        eager: true
    })
    courses: Course

    @ManyToOne(() => Student, (student) => student.course)
    student: Student
}