import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"


import {Grade} from "./grade.entity"
import {Student} from "./student.entity"


export enum StatusGradeRole {
    COMPLETO = "Completo",
    INCOMPLETO = "Incompleto"
}


@Entity()
export class StatusGrade {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        type: "enum",
        nullable: false,
        enum: StatusGradeRole,
        default: StatusGradeRole.INCOMPLETO
    })
    status: StatusGradeRole

    @Column({
        type: "float",
        nullable: false
    }) 
    duration: number
    
    @ManyToOne(() => Grade, (grade) => grade.statusGrade)
    grade: Grade

    @ManyToOne(() => Student, (student) => student.grades)
    student: Student
}