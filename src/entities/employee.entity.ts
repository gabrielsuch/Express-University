import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany} from "typeorm"

import {Grade} from "./grade.entity"


enum SexRole {
    Masculino = "Masculino",
    Feminino = "Feminino",
    NULL = "null"
}


@Entity()
export class Employee {
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

    @Column({
        default: false
    })
    is_adm: boolean

    @OneToMany(() => Grade, (grade) => grade.teacher)
    grade: Grade 
}