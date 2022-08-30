import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"


@Entity()
export class Grade {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        length: 100
    })
    name: string
}