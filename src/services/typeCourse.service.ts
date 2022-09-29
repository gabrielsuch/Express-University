import {Request} from "express"

import {AppDataSource} from "../data-source"
import {TypeCourse} from "../entities/typeCourse.entity"


class TypeCourseService {
    getTypeCourse = async ({params}: Request) => {
        const typeCourseRepository = AppDataSource.getRepository(TypeCourse)
        const typeCourse = await typeCourseRepository.findOneBy({
            id: params.typeCourse_id
        })

        return {status: 200, message: typeCourse}
    }

    getAllTypeCourses = async () => {
        const typeCourseRepository = AppDataSource.getRepository(TypeCourse)
        const typeCourses = await typeCourseRepository.find()

        return {status: 200, message: typeCourses}
    }

    createTypeCourse = async ({validated}: Request) => {
        const typeCourseRepository = AppDataSource.getRepository(TypeCourse)
        
        const typeCourse = new TypeCourse()
        typeCourse.name = validated["name"]

        typeCourseRepository.create(typeCourse)
        await typeCourseRepository.save(typeCourse)

        return {status: 201, message: typeCourse}
    }

    updateTypeCourse = async ({body, params}: Request) => {
        const typeCourseRepository = AppDataSource.getRepository(TypeCourse)
        const course = await typeCourseRepository.findOneBy({
            id: params.typeCourse_id
        })

        await typeCourseRepository.update(course.id, body)

        const updatedCourse = await typeCourseRepository.findOneBy({
            id: params.typeCourse_id
        })

        return {status: 200, message: updatedCourse}
    }

    deleteTypeCourse = async ({params}: Request) => {
        const typeCourseRepository = AppDataSource.getRepository(TypeCourse)
        const course = await typeCourseRepository.findOneBy({
            id: params.typeCourse_id
        })
        
        await typeCourseRepository.delete(course.id)

        return {status: 204, message: ""}
    }
}


export default new TypeCourseService()