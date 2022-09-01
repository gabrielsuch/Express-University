import {Request, Response} from "express"

import TypeGradeService from "../services/typeGrade.service"


class TypeGradeController {
    getTypeGrade = async (req: Request, res: Response) => {
        const typeGrade = await TypeGradeService.getTypeGrade(req)

        return res.status(typeGrade.status).json(typeGrade.message)
    }

    getAllTypeGrades = async (req: Request, res: Response) => {
        const typeGrades = await TypeGradeService.getAllTypeGrades()

        return res.status(typeGrades.status).json(typeGrades.message)
    }

    createTypeGrade = async (req: Request, res: Response) => {
        const typeGrade = await TypeGradeService.createTypeGrade(req)

        return res.status(typeGrade.status).json(typeGrade.message)
    }

    updateTypeGrade = async (req: Request, res: Response) => {  
        const typeGrade = await TypeGradeService.updateTypeGrade(req)

        return res.status(typeGrade.status).json(typeGrade.message)
    }
    
    deleteTypeGrade = async (req: Request, res: Response) => {
        const typeGrade = await TypeGradeService.deleteTypeGrade(req)

        return res.status(typeGrade.status).json(typeGrade.message)
    }
}


export default new TypeGradeController()