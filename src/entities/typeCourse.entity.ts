import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"


@Entity()
export class TypeCourse {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        unique: true,
        length: 100
    })
    name: string
}