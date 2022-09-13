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
        length: 100
    })
    name: string

    @Column()
    birthdate: Date

    @Column({
        unique: true,
        length: 14
    })
    cpf: string

    @Column({
        length: 14
    })
    telephone: string

    @Column({
        length: 15
    })
    cellphone: string

    @CreateDateColumn()
    created_at: Date

    @Column({
        type: "enum",
        enum: SexRole,
        default: SexRole.NULL
    })
    sex: SexRole

    @Column({
        unique: true,
        length: 150
    })
    email: string

    @Column({
        length: 255
    })
    password: string

    @ManyToOne(() => Course, (course) => course.students)
    course: Course

    @OneToMany(() => Rating, (rating) => rating.user)
    ratings: Rating[]

    @OneToMany(() => StatusGrade, (statusGrade) => statusGrade.student)
    grade: StatusGrade

    @OneToMany(() => StatusCourse, (statusCourse) => statusCourse.student)
    courses: StatusCourse[]
}