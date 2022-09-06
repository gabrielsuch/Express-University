import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"

import {Course} from "./course.entity"
import {User} from "./user.entity"


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

    @ManyToOne(() => User, (user) => user.grade, {
        eager: true
    })
    teacher: User
}