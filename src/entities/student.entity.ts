import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany} from "typeorm"

import {Course} from "./course.entity"
import {Grade} from "./grade.entity"
import {Rating} from "./rating.entity"


// enum TypeRole {
//     Estudante = "Estudante",
//     Professor = "Professor"
// }

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
        length: 10
    })
    telephone: string

    @Column({
        length: 11
    })
    cellphone: string

    @CreateDateColumn()
    created_at: Date

    // @Column({
    //     type: "enum",
    //     enum: TypeRole,
    //     default: TypeRole.Estudante
    // })
    // type: TypeRole

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

    // @Column({
    //     default: false
    // })
    // is_adm: boolean

    @ManyToOne(() => Course, (course) => course.students)
    course: Course

    // @OneToMany(() => Grade, (grade) => grade.teacher)
    // grade: Grade 

    @OneToMany(() => Rating, (rating) => rating.user)
    ratings: Rating[]
}