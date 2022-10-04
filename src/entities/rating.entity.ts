import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn} from "typeorm"

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

    @CreateDateColumn({
        nullable: false
    })
    created_at: Date
    
    @ManyToOne(() => Course, (course) => course.ratings)
    course: Course

    @ManyToOne(() => Student, (student) => student.ratings, {
        eager: true
    })
    student: Student
}