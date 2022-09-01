import {Request} from "express"

import {AppDataSource} from "../data-source"
import {TypeGrade} from "../entities/typeGrade.entity"


class TypeGradeService {
    getTypeGrade = async ({params}: Request) => {
        const typeGradeRepository = AppDataSource.getRepository(TypeGrade)
        const typeGrade = await typeGradeRepository.findOneBy({
            id: params.typeGrade_id
        })

        if(!typeGrade) {
            return {status: 404, message: {error: "Type Grade not found."}}
        }

        return {status: 200, message: typeGrade}
    }

    getAllTypeGrades = async () => {
        const typeGradeRepository = AppDataSource.getRepository(TypeGrade)
        const typeGrades = await typeGradeRepository.find()

        return {status: 200, message: typeGrades}
    }

    createTypeGrade = async ({body}: Request) => {
        const typeGradeRepository = AppDataSource.getRepository(TypeGrade)
        
        const typeGrade = new TypeGrade()
        typeGrade.id = body.id
        typeGrade.name = body.name

        typeGradeRepository.create(typeGrade)
        await typeGradeRepository.save(typeGrade)

        return {status: 201, message: typeGrade}
    }

    updateTypeGrade = async ({body, params}: Request) => {
        const typeGradeRepository = AppDataSource.getRepository(TypeGrade)
        const grade = await typeGradeRepository.findOneBy({
            id: params.typeGrade_id
        })

        if(!grade) {
            return {status: 404, message: {error: "Type Grade not found."}}
        }

        await typeGradeRepository.update(grade.id, body)

        const updatedGrade = await typeGradeRepository.findOneBy({
            id: params.typeGrade_id
        })

        return {status: 200, message: updatedGrade}
    }

    deleteTypeGrade = async ({params}: Request) => {
        const typeGradeRepository = AppDataSource.getRepository(TypeGrade)
        const grade = await typeGradeRepository.findOneBy({
            id: params.typeGrade_id
        })

        if(!grade) {
            return {status: 404, message: {error: "Type Grade not found."}}
        }
        
        await typeGradeRepository.delete(grade.id)

        return {status: 204, message: ""}
    }
}


export default new TypeGradeService()