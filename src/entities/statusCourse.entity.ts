import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"


import {Course} from "./course.entity"
import {Student} from "./student.entity"


export enum StatusCourseRole {
    COMPLETO = "Completo",
    INCOMPLETO = "Incompleto"
}


@Entity()
export class StatusCourse {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        type: "enum",
        nullable: false,
        enum: StatusCourseRole,
        default: StatusCourseRole.INCOMPLETO
    })
    status: StatusCourseRole

    @Column({
        type: "float",
        nullable: false
    }) 
    duration: number

    @ManyToOne(() => Course, (course) => course.statusCourse)
    courses: Course

    @ManyToOne(() => Student, (student) => student.course)
    student: Student
}