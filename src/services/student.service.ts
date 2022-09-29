import {Request} from "express"

import {AppDataSource} from "../data-source"
import {Student} from "../entities/student.entity"
import {Course} from "../entities/course.entity"
import {StatusCourse} from "../entities/statusCourse.entity"
import {StatusGrade} from "../entities/statusGrade.entity"

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import {StatusCourseRole} from "../entities/statusCourse.entity"
import {StatusGradeRole} from "../entities/statusGrade.entity"


class StudentSerivce {
    getCurrentStudent = async ({decoded}: Request) => {
        const studentRepository = AppDataSource.getRepository(Student)
        const currentStudent = await studentRepository.findOneBy({
            email: decoded
        })

        return {status: 200, message: currentStudent}
    }

    getStudents = async () => {
        const studentRepository = AppDataSource.getRepository(Student)
        const students = await studentRepository.find()

        return {status: 200, message: students}
    }

    createStudent = async ({validated}: Request) => {
        const studentRepository = AppDataSource.getRepository(Student)

        const student = new Student()
        student.name = validated["name"]
        student.birthdate = validated["birthdate"]
        student.cpf = validated["cpf"]
        student.telephone = validated["telephone"]
        student.cellphone = validated["cellphone"]
        student.created_at = validated["created_at"]
        student.sex = validated["sex"]
        student.email = validated["email"]
        student.password = await bcrypt.hash(validated["password"], 10)

        studentRepository.create(student)
        await studentRepository.save(student)

        return {status: 201, message: validated}
    }

    joinCourse = async ({params, decoded}: Request) => {
        const studentRepository = AppDataSource.getRepository(Student)
        const student = await studentRepository.findOneBy({
            email: decoded
        })

        const courseRepository = AppDataSource.getRepository(Course)
        const course = await courseRepository.findOneBy({
            id: params.course_id
        })

        const studentCourse = new Student()
        studentCourse.course = course

        await studentRepository.update(student.id, studentCourse)

        const statusCourseRepository = AppDataSource.getRepository(StatusCourse)

        const statusCourse = new StatusCourse()
        statusCourse.duration = 0
        statusCourse.status = StatusCourseRole.INCOMPLETO
        statusCourse.courses = course
        statusCourse.student = student

        const findStudentInCourse = await statusCourseRepository.find({
            where: {
                courses: {
                    id: statusCourse.courses.id
                },
                student: {
                    id: statusCourse.student.id
                }
            }
        })

        if(findStudentInCourse.length <= 0) {
            statusCourseRepository.create(statusCourse)
            await statusCourseRepository.save(statusCourse)
        }


        const statusGradeRepository = AppDataSource.getRepository(StatusGrade)

        const statusGrade = new StatusGrade()
        
        course.grades.map(async(grade) => {
            // FAZER UMA VALIDAÇÃO, SE A GRADE JA ESTIVER, ENTÃO NÃO ADICIONAR
            

            statusGrade.duration = 0
            statusGrade.status = StatusGradeRole.INCOMPLETO
            statusGrade.student = student
            statusGrade.grade = grade
            
            statusGradeRepository.create(statusGrade)
            await statusGradeRepository.save(statusGrade)
        })   

        return {status: 200, message: studentCourse.course}
    }

    updateCurrentStudent = async ({body, decoded}: Request) => {
        const studentRepository = AppDataSource.getRepository(Student)
        const currentStudent = await studentRepository.findOneBy({
            email: decoded
        })

        if(body.password) {
            body.password = await bcrypt.hash(body.password, 10)
        }

        await studentRepository.update(currentStudent.id, body)

        const updatedStudent = await studentRepository.findOneBy({
            email: decoded
        })

        return {status: 200, message: updatedStudent}
    }

    deleteCurrentStudent = async ({decoded}: Request) => {
        const studentRepository = AppDataSource.getRepository(Student)
        const currentStudent = await studentRepository.findOneBy({
            email: decoded
        })

        await studentRepository.delete(currentStudent.id)

        return {status: 204, message: ""}
    }

    loginStudent = async ({validated}: Request) => {
        const studentRepository = AppDataSource.getRepository(Student)
        const student = await studentRepository.findOneBy({
            email: validated["email"]
        })

        if(!student) {
            return {status: 404, message: {error: "Email not found."}}
        }

        if(!await bcrypt.compare(validated["password"], student.password)) {
            return {status: 400, message: {error: "Email or Password doesn't matches."}}
        }
        
        const token = jwt.sign({email: validated["email"]}, String(process.env.SECRET_KEY), {expiresIn: "12h"})
        
        return {status: 200, message: {accessToken: token}}
    }
}


export default new StudentSerivce()