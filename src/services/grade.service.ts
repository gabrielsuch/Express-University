import {Request} from "express"

import {AppDataSource} from "../data-source"
import {Grade} from "../entities/grade.entity"


class GradeService {
    getGrade = async ({params}: Request) => {
        const gradeRepository = AppDataSource.getRepository(Grade)
        const grade = await gradeRepository.findOneBy({
            id: params.grade_id
        })

        if(!grade) {
            return {status: 404, message: {error: "Grade not found."}}
        }

        return {status: 200, message: grade}
    }

    getGrades = async () => {
        const gradeRepository = AppDataSource.getRepository(Grade)
        const grades = await gradeRepository.find()

        return {status: 200, message: grades}
    }

    createGrade = async ({body}: Request) => {
        const gradeRepository = AppDataSource.getRepository(Grade)

        const grade = new Grade()
        grade.id = body.id
        grade.name = body.name

        gradeRepository.create(grade)
        await gradeRepository.save(grade)

        return {status: 201, message: grade}
    }

    updateGrade = async ({body, params}: Request) => {
        const gradeRepository = AppDataSource.getRepository(Grade)
        const grade = await gradeRepository.findOneBy({
            id: params.grade_id
        })

        if(!grade) {
            return {status: 404, message: {error: "Grade not found."}}
        }

        await gradeRepository.update(params.grade_id, body)

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

        if(!grade) {
            return {status: 404, message: {error: "Grade not found."}}
        }

        await gradeRepository.delete(params.grade_id)

        return {status: 204, message: ""}
    }
}


export default new GradeService()