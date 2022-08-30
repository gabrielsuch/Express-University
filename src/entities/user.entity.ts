import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm"


enum TypeRole {
    Estudante = "Estudante",
    Professor = "Professor"
}

enum SexRole {
    Masculino = "Masculino",
    Feminino = "Feminino",
    NULL = "null"
}


@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        length: 100
    })
    name: string

    @Column()
    birthdate: Date

    @Column({
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

    @Column({
        type: "enum",
        enum: TypeRole,
        default: TypeRole.Estudante
    })
    type: TypeRole

    @Column({
        type: "enum",
        enum: SexRole,
        default: SexRole.NULL
    })
    sex: SexRole

    @Column({
        length: 150
    })
    email: string

    @Column({
        length: 255
    })
    password: string

    @Column({
        default: false
    })
    is_adm: boolean
}