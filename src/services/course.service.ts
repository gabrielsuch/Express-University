import {Request} from "express"

import {AppDataSource} from "../data-source"
import {Course} from "../entities/course.entity"


class CourseService {
    getCourse = async ({params}: Request) => {
        const courseRepository = AppDataSource.getRepository(Course)
        const course = await courseRepository.findOneBy({
            id: params.course_id
        })

        return {status: 200, message: course}
    }

    getAllCourses = async () => {
        const courseRepository = AppDataSource.getRepository(Course)
        const courses = await courseRepository.find()

        return {status: 200, message: courses}
    }

    createCourse = async ({body}: Request) => {
        const courseRepository = AppDataSource.getRepository(Course)

        const course = new Course()
        course.id = body.id
        course.name = body.name
        course.duration = body.duration
        course.created_at = body.created_at
        course.updated_at = body.created_at
        
        courseRepository.create(course)
        await courseRepository.save(course)

        return {status: 201, message: course}
    }

    updateCourse = async ({body, params}: Request) => {
        const courseRepository = AppDataSource.getRepository(Course)
        const course = await courseRepository.findOneBy({
            id: params.course_id
        })

        await courseRepository.update(course.id, body)

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