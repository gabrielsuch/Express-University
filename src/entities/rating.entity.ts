import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"

import {Course} from "./course.entity"
import {User} from "./user.entity"


@Entity()
export class Rating {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        length: 255
    })
    description: string
    
    @ManyToOne(() => Course, (course) => course.ratings)
    course: Course

    @ManyToOne(() => User, (user) => user.ratings)
    user: User
}