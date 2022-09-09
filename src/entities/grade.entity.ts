import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"

import {Course} from "./course.entity"
import {Employee} from "./employee.entity"


@Entity()
export class Grade {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        unique: true,
        length: 100
    })
    name: string

    @ManyToOne(() => Course, (course) => course.grades)
    course: Course

    @ManyToOne(() => Employee, (employee) => employee.grade, {
        eager: true
    })
    teacher: Employee
}