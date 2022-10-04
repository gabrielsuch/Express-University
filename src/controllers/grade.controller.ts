import {Request, Response} from "express"

import GradeService from "../services/grade.service"


class GradeController {
    getGrade = async (req: Request, res: Response) => {
        const grade = await GradeService.getGrade(req)

        return res.status(200).json(grade)
    }

    getGrades = async (req: Request, res: Response) => {
        const grades = await GradeService.getGrades()

        return res.status(200).json(grades)
    }

    createGrade = async (req: Request, res: Response) => {
        const grade = await GradeService.createGrade(req)

        return res.status(201).json(grade)
    }

    updateGrade = async (req: Request, res: Response) => {
        const grade = await GradeService.updateGrade(req)

        return res.status(200).json(grade)
    }

    deleteGrade = async (req: Request, res: Response) => {
        const grade = await GradeService.deleteGrade(req)

        return res.status(grade.status).json(grade.message)
    }

    assignGradeToCourse = async (req: Request, res: Response) => {
        const assign = await GradeService.assignGradeToCourse(req)

        return res.status(assign.status).json(assign.message)
    }
}


export default new GradeController()