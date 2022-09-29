import {Request} from "express"

import {AppDataSource} from "../data-source"
import {Grade} from "../entities/grade.entity"
import {Course} from "../entities/course.entity"


class GradeService {
    getGrade = async ({params}: Request) => {
        const gradeRepository = AppDataSource.getRepository(Grade)
        const grade = await gradeRepository.findOneBy({
            id: params.grade_id
        })

        return {status: 200, message: grade}
    }

    getGrades = async () => {
        const gradeRepository = AppDataSource.getRepository(Grade)
        const grades = await gradeRepository.find()

        return {status: 200, message: grades}
    }

    createGrade = async ({validated}: Request) => {
        const gradeRepository = AppDataSource.getRepository(Grade)

        const grade = new Grade()
        grade.name = validated["name"]
        grade.duration = validated["duration"]

        gradeRepository.create(grade)
        await gradeRepository.save(grade)

        return {status: 201, message: validated}
    }

    assignGradeToCourse = async ({params}: Request) => {
        const gradeRepository = AppDataSource.getRepository(Grade)
        const grade = await gradeRepository.findOneBy({
            id: params.grade_id
        })

        const courseRepository = AppDataSource.getRepository(Course)
        const course = await courseRepository.findOneBy({
            id: params.course_id
        })

        const gradeCourse = new Grade()
        gradeCourse.course = course

        await gradeRepository.update(grade.id, gradeCourse)

        return {status: 200, message: "OK"}
    }

    // VERIFICAR UMA POSSIBILIDADE, DE REMOVER A FUNÇÃO (assignGradeToCourse), E COLOCAR TUDO NO (updateGrade), SENDO ASSIM, DANDO A POSSIBILIDADE DO ADM COLOCAR O CURSO, E O PROFESSOR QUE DARÁ ESTA AULA.

    updateGrade = async ({body, params}: Request) => {
        const gradeRepository = AppDataSource.getRepository(Grade)
        const grade = await gradeRepository.findOneBy({
            id: params.grade_id
        })

        await gradeRepository.update(grade.id, body)

        const updatedGrade = await gradeRepository.findOneBy({
            id: params.grade_id
        })

        return {status: 200, message: updatedGrade}
    }

    deleteGrade = async ({params}: Request) => {
        const gradeRepository = AppDataSource.getRepository(Grade)
        const grade = await gradeRepository.findOneBy({
            id: params.grade_id
        })

        await gradeRepository.delete(grade.id)

        return {status: 204, message: ""}
    }
}


export default new GradeService()