import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm"


@Entity()
export class Course {
    @PrimaryGeneratedColumn("uuid") 
    id: string

    @Column({
        unique: true,
        length: 150
    })
    name: string

    @Column({
        type: "int"
    })
    duration: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}