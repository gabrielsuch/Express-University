import {Request, Response} from "express"

import GradeService from "../services/grade.service"


class GradeController {
    getGrade = async (req: Request, res: Response) => {
        const grade = await GradeService.getGrade(req)

        return res.status(grade.status).json(grade.message)
    }

    getGrades = async (req: Request, res: Response) => {
        const grades = await GradeService.getGrades()

        return res.status(grades.status).json(grades.message)
    }

    createGrade = async (req: Request, res: Response) => {
        const grade = await GradeService.createGrade(req)

        return res.status(grade.status).json(grade.message)
    }

    updateGrade = async (req: Request, res: Response) => {
        const grade = await GradeService.updateGrade(req)

        return res.status(grade.status).json(grade.message)
    }

    deleteGrade = async (req: Request, res: Response) => {
        const grade = await GradeService.deleteGrade(req)

        return res.status(grade.status).json(grade.message)
    }
}


export default new GradeController()