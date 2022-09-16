import {Request} from "express"

import {AppDataSource} from "../data-source"
import {Student} from "../entities/student.entity"
import {Course} from "../entities/course.entity"

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


class StudentSerivce {
    getCurrentUser = async ({decoded}: Request) => {
        const studentRepository = AppDataSource.getRepository(Student)
        const currentStudent = await studentRepository.findOneBy({
            email: decoded
        })

        return {status: 200, message: currentStudent}
    }

    getUsers = async () => {
        const studentRepository = AppDataSource.getRepository(Student)
        const students = await studentRepository.find({
            relations: {
                course: true
            }
        })

        return {status: 200, message: students}
    }

    createUser = async ({body}: Request) => {
        const studentRepository = AppDataSource.getRepository(Student)

        const student = new Student()
        student.id = body.id
        student.name = body.name
        student.birthdate = body.birthdate
        student.cpf = body.cpf
        student.telephone = body.telephone
        student.cellphone = body.cellphone
        student.created_at = body.created_at
        student.sex = body.sex
        student.email = body.email
        student.password = await bcrypt.hash(body.password, 10)

        studentRepository.create(student)
        await studentRepository.save(student)

        return {status: 201, message: student}
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

        return {status: 200, message: studentCourse.course}
    }

    updateUser = async ({body, decoded}: Request) => {
        const studentRepository = AppDataSource.getRepository(Student)
        const currentStudent = await studentRepository.findOneBy({
            email: decoded
        })

        await studentRepository.update(currentStudent.id, body)

        const updatedStudent = await studentRepository.findOneBy({
            email: decoded
        })

        return {status: 200, message: updatedStudent}
    }

    deleteUser = async ({decoded}: Request) => {
        const studentRepository = AppDataSource.getRepository(Student)
        const currentStudent = await studentRepository.findOneBy({
            email: decoded
        })

        await studentRepository.delete(currentStudent.id)

        return {status: 204, message: ""}
    }

    login = async ({body}: Request) => {
        const studentRepository = AppDataSource.getRepository(Student)
        const student = await studentRepository.findOneBy({
            email: body.email
        })

        if(!student) {
            return {status: 404, message: {error: "Email not found."}}
        }

        if(!await bcrypt.compare(body.password, student.password)) {
            return {status: 400, message: {error: "Email or Password doesn't matches."}}
        }
        
        const token = jwt.sign({email: body.email}, String(process.env.SECRET_KEY), {expiresIn: "12h"})
        
        return {status: 200, message: {accessToken: token}}
    }
}


export default new StudentSerivce()