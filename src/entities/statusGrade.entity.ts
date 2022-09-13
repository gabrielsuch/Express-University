import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"


import {Grade} from "./grade.entity"
import {Student} from "./student.entity"


enum StatusGradeRole {
    COMPLETO = "Completo",
    INCOMPLETO = "Incompleto"
}


@Entity()
export class StatusGrade {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        type: "enum",
        enum: StatusGradeRole,
        default: StatusGradeRole.INCOMPLETO
    })
    status: StatusGradeRole

    @Column({
        type: "float"
    }) 
    duration: number
    
    @ManyToOne(() => Grade, (grade) => grade.statusGrade, {
        eager: true
    })
    grade: Grade

    @ManyToOne(() => Student, (student) => student.grade)
    student: Student
}