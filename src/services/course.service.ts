import {Request} from "express"

import {AppDataSource} from "../data-source"
import {Course} from "../entities/course.entity"

import {serializedShowCourseSchema, serializedCreateCourseSchema} from "../schemas/course.schema"


class CourseService {
    getCourse = async ({params}: Request) => {
        const courseRepository = AppDataSource.getRepository(Course)

        // MUDAR O RETORNO, DO STUDENT (SOMENTE MOSTRAR O [ID, NAME])
        const course = await courseRepository.createQueryBuilder("course")
                                              .select(["course.id", "course.name", "course.duration", "course.created_at", "grade.id", "grade.name", "grade.duration"])
                                              .leftJoinAndSelect("course.grades", "grade")
                                              .leftJoinAndSelect("course.ratings", "rating")
                                              .leftJoinAndSelect("rating.student", "student")
                                              .where("course.id = :id", {
                                                id: params.course_id
                                              })
                                              .getOne()

        return {status: 200, message: course}
    }

    getAllCourses = async () => {
        const courseRepository = AppDataSource.getRepository(Course)

        // MUDAR O RETORNO, DO STUDENT (SOMENTE MOSTRAR O [ID, NAME])
        const courses = await courseRepository.createQueryBuilder("course")
                                              .select(["course.id", "course.name", "course.duration", "course.created_at", "grade.id", "grade.name", "grade.duration"])
                                              .leftJoinAndSelect("course.grades", "grade")
                                              .leftJoinAndSelect("course.ratings", "rating")
                                              .leftJoinAndSelect("rating.student", "student")
                                              .getMany()

                                              
        return await serializedShowCourseSchema.validate(courses, {stripUnknown: true})
    }

    createCourse = async ({validated}: Request) => {
        const courseRepository = AppDataSource.getRepository(Course)

        const course = new Course()
        course.name = validated["name"]
        course.duration = validated["duration"]
        
        courseRepository.create(course)
        const courseCreated = await courseRepository.save(course)

        return await serializedCreateCourseSchema.validate(courseCreated, {stripUnknown: true})
    }

    updateCourse = async ({validated, params}: Request) => {
        const courseRepository = AppDataSource.getRepository(Course)
        const course = await courseRepository.findOneBy({
            id: params.course_id
        })

        await courseRepository.update(course.id, {...validated as Course})

        const updatedCourse = await courseRepository.findOneBy({
            id: params.course_id
        })

        return {status: 200, message: updatedCourse}
    }

    deleteCourse = async ({params}: Request) => {
        const courseRepository = AppDataSource.getRepository(Course)
        const course = await courseRepository.findOneBy({
            id: params.course_id
        })

        await courseRepository.delete(course.id)

        return {status: 204, message: ""}
    }
}


export default new CourseService()