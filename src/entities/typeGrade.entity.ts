import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"


@Entity()
export class TypeGrade {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        unique: true,
        length: 100
    })
    name: string
}