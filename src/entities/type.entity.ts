import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"


@Entity()
export class Type {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        length: 100
    })
    name: string
}