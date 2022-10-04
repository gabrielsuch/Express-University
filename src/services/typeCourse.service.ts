import {Request} from "express"

import {AppDataSource} from "../data-source"
import {TypeCourse} from "../entities/typeCourse.entity"

import {serializedShowOneTypeCourseSchema, serializedShowAllTypeCourseSchema, serializedCreateOrUpdateTypeCourseSchema} from "../schemas/typeCourse.schema"


class TypeCourseService {
    getTypeCourse = async ({params}: Request) => {
        const typeCourseRepository = AppDataSource.getRepository(TypeCourse)
        const typeCourse = await typeCourseRepository.findOneBy({
            id: params.typeCourse_id
        })

        return await serializedShowOneTypeCourseSchema.validate(typeCourse, {stripUnknown: true})
    }

    getAllTypeCourses = async () => {
        const typeCourseRepository = AppDataSource.getRepository(TypeCourse)
        const typeCourses = await typeCourseRepository.find({
            order: {
                name: "ASC"
            },
        })

        return await serializedShowAllTypeCourseSchema.validate(typeCourses, {stripUnknown: true})
    }

    createTypeCourse = async ({validated}: Request) => {
        const typeCourseRepository = AppDataSource.getRepository(TypeCourse)
        
        const typeCourse = new TypeCourse()
        typeCourse.name = validated["name"]

        typeCourseRepository.create(typeCourse)
        await typeCourseRepository.save(typeCourse)

        return await serializedCreateOrUpdateTypeCourseSchema.validate(typeCourse, {stripUnknown: true})
    }

    updateTypeCourse = async ({validated, params}: Request) => {
        const typeCourseRepository = AppDataSource.getRepository(TypeCourse)
        const course = await typeCourseRepository.findOneBy({
            id: params.typeCourse_id
        })

        await typeCourseRepository.update(course.id, {...validated as TypeCourse})

        const updatedCourse = await typeCourseRepository.findOneBy({
            id: params.typeCourse_id
        })

        return await serializedCreateOrUpdateTypeCourseSchema.validate(updatedCourse, {stripUnknown: true})
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