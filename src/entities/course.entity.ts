import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm"


@Entity()
export class Course {
    @PrimaryGeneratedColumn("uuid") 
    id: string

    @Column({
        length: 150
    })
    name: string

    @Column({
        type: "int",
        length: 3
    })
    duration: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}