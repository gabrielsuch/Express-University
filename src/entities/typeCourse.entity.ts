import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"

import {Course} from "./course.entity"


@Entity()
export class TypeCourse {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        unique: true,
        length: 100,
        nullable: false
    })
    name: string

    @OneToMany(() => Course, (course) => course.type, {
        eager: true
    })
    courses: Course[]
}