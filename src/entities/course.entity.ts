import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne} from "typeorm"

import {User} from "./user.entity"
import {Grade} from "./grade.entity"
import {TypeCourse} from "./typeCourse.entity"


@Entity()
export class Course {
    @PrimaryGeneratedColumn("uuid") 
    id: string

    @Column({
        unique: true,
        length: 150
    })
    name: string

    @Column({
        type: "int"
    })
    duration: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(() => User, (user) => user.course, {
        eager: true
    })
    students: User[]

    @OneToMany(() => Grade, (grade) => grade.course, {
        eager: true
    })
    grades: Grade[]

    @ManyToOne(() => TypeCourse, (typeCourse) => typeCourse.courses)
    type: TypeCourse
}