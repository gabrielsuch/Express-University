import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany} from "typeorm"

import {Course} from "./course.entity"
import {Rating} from "./rating.entity"
import {StatusGrade} from "./statusGrade.entity"
import {StatusCourse} from "./statusCourse.entity"


enum SexRole {
    Masculino = "Masculino",
    Feminino = "Feminino",
    NULL = "null"
}


@Entity()
export class Student {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        length: 100,
        nullable: false
    })
    name: string

    @Column({
        nullable: false
    })
    birthdate: Date

    @Column({
        unique: true,
        length: 14,
        nullable: false
    })
    cpf: string

    @Column({
        length: 14,
        nullable: true
    })
    telephone: string

    @Column({
        length: 15,
        nullable: true
    })
    cellphone: string

    @CreateDateColumn({
        nullable: false
    })
    created_at: Date

    @Column({
        type: "enum",
        nullable: false,
        enum: SexRole,
        default: SexRole.NULL
    })
    sex: SexRole

    @Column({
        unique: true,
        length: 150,
        nullable: false
    })
    email: string

    @Column({
        length: 255,
        nullable: false
    })
    password: string

    @ManyToOne(() => Course, (course) => course.students)
    course: Course

    @OneToMany(() => Rating, (rating) => rating.student)
    ratings: Rating[]

    @OneToMany(() => StatusGrade, (statusGrade) => statusGrade.student, {
        eager: true
    })
    grades: StatusGrade

    @OneToMany(() => StatusCourse, (statusCourse) => statusCourse.student, {
        eager: true
    })
    courses: StatusCourse[]
}