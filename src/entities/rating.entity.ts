import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"

import {Course} from "./course.entity"
import {Student} from "./student.entity"


@Entity()
export class Rating {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        length: 255,
        nullable: false
    })
    description: string
    
    @ManyToOne(() => Course, (course) => course.ratings)
    course: Course

    @ManyToOne(() => Student, (student) => student.ratings, {
        eager: true
    })
    student: Student
}