import {Request} from "express"

import {AppDataSource} from "../data-source"
import {Grade} from "../entities/grade.entity"
import {Course} from "../entities/course.entity"

import {serializedShowOneGradeSchema, serializedShowAllGradesSchema, serializedCreateOrUpdateGradeSchema} from "../schemas/grade.schema"


class GradeService {
    getGrade = async ({params}: Request) => {
        const gradeRepository = AppDataSource.getRepository(Grade)
        const grade = await gradeRepository.findOneBy({
            id: params.grade_id
        })

        return await serializedShowOneGradeSchema.validate(grade, {stripUnknown: true})
    }

    getGrades = async () => {
        const gradeRepository = AppDataSource.getRepository(Grade)
        const grades = await gradeRepository.find()

        return await serializedShowAllGradesSchema.validate(grades, {stripUnknown: true})
    }

    createGrade = async ({validated}: Request) => {
        const gradeRepository = AppDataSource.getRepository(Grade)

        const grade = new Grade()
        grade.name = validated["name"]
        grade.duration = validated["duration"]

        gradeRepository.create(grade)
        await gradeRepository.save(grade)

        return await serializedCreateOrUpdateGradeSchema.validate(grade, {stripUnknown: true})
    }

    updateGrade = async ({validated, params}: Request) => {
        const gradeRepository = AppDataSource.getRepository(Grade)
        const grade = await gradeRepository.findOneBy({
            id: params.grade_id
        })

        await gradeRepository.update(grade.id, {...validated as Grade})

        const updatedGrade = await gradeRepository.findOneBy({
            id: params.grade_id
        })

        return await serializedCreateOrUpdateGradeSchema.validate(updatedGrade, {stripUnknown: true})
    }

    deleteGrade = async ({params}: Request) => {
        const gradeRepository = AppDataSource.getRepository(Grade)
        const grade = await gradeRepository.findOneBy({
            id: params.grade_id
        })

        await gradeRepository.delete(grade.id)

        return {status: 204, message: ""}
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
}


export default new GradeService()