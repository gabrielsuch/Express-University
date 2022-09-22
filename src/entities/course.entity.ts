import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne} from "typeorm"

import {Student} from "./student.entity"
import {Grade} from "./grade.entity"
import {TypeCourse} from "./typeCourse.entity"
import {Rating} from "./rating.entity"
import {StatusCourse} from "./statusCourse.entity"


@Entity()
export class Course {
    @PrimaryGeneratedColumn("uuid") 
    id: string

    @Column({
        unique: true,
        length: 150,
        nullable: false
    })
    name: string

    @Column({
        type: "float",
        nullable: false
    })
    duration: number

    @CreateDateColumn({
        nullable: false
    })
    created_at: Date

    @UpdateDateColumn({
        nullable: false
    })
    updated_at: Date

    @OneToMany(() => Student, (student) => student.course)
    students: Student[]

    @OneToMany(() => Grade, (grade) => grade.course, {
        eager: true
    })
    grades: Grade[]

    @ManyToOne(() => TypeCourse, (typeCourse) => typeCourse.courses)
    type: TypeCourse

    @OneToMany(() => Rating, (rating) => rating.course, {
        eager: true
    })
    ratings: Rating[]

    @OneToMany(() => StatusCourse, (statusCourse) => statusCourse.courses)
    statusCourse: StatusCourse[]
}