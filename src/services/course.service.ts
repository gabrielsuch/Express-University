import {Request} from "express"

import {AppDataSource} from "../data-source"
import {Course} from "../entities/course.entity"

import {serializedShowAllCoursesSchema, serializedShowOneCourseSchema, serializedCreateOrUpdateCourseSchema} from "../schemas/course.schema"


class CourseService {
    getCourse = async ({params}: Request) => {
        const courseRepository = AppDataSource.getRepository(Course)

        const course = await courseRepository.createQueryBuilder("course")
                                              .select(["course.id", "course.name", "course.duration", "course.created_at", "grade.id", "grade.name", "grade.duration"])
                                              .leftJoinAndSelect("course.grades", "grade")
                                              .leftJoinAndSelect("course.ratings", "rating")
                                              .leftJoinAndSelect("rating.student", "student")
                                              .where("course.id = :id", {
                                                id: params.course_id
                                              })
                                              .getOne()


        return await serializedShowOneCourseSchema.validate(course, {stripUnknown: true})
    }

    getAllCourses = async () => {
        const courseRepository = AppDataSource.getRepository(Course)

        const courses = await courseRepository.createQueryBuilder("course")
                                              .select(["course.id", "course.name", "course.duration", "course.created_at", "grade.id", "grade.name", "grade.duration"])
                                              .leftJoinAndSelect("course.grades", "grade")
                                              .leftJoinAndSelect("course.ratings", "rating")
                                              .leftJoinAndSelect("rating.student", "student")
                                              .getMany()


        return await serializedShowAllCoursesSchema.validate(courses, {stripUnknown: true})
    }

    createCourse = async ({validated}: Request) => {
        const courseRepository = AppDataSource.getRepository(Course)

        const course = new Course()
        course.name = validated["name"]
        course.duration = validated["duration"]
        
        courseRepository.create(course)
        const courseCreated = await courseRepository.save(course)

        return await serializedCreateOrUpdateCourseSchema.validate(courseCreated, {stripUnknown: true})
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

        return await serializedCreateOrUpdateCourseSchema.validate(updatedCourse, {stripUnknown: true})
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