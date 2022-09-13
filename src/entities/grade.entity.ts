import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm"

import {Course} from "./course.entity"
import {Employee} from "./employee.entity"
import {StatusGrade} from "./statusGrade.entity"


@Entity()
export class Grade {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        unique: true,
        length: 100
    })
    name: string

    @Column({
        type: "float"
    })
    duration: number

    @ManyToOne(() => Course, (course) => course.grades)
    course: Course

    @ManyToOne(() => Employee, (employee) => employee.grade, {
        eager: true
    })
    teacher: Employee

    @OneToMany(() => StatusGrade, (statusGrade) => statusGrade.grade)
    statusGrade: StatusGrade[]
}