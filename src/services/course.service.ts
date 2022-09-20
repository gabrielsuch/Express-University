import {Request} from "express"

import {AppDataSource} from "../data-source"
import {Course} from "../entities/course.entity"
import {Grade} from "../entities/grade.entity"
import {Rating} from "../entities/rating.entity"


class CourseService {
    getCourse = async ({params}: Request) => {
        const courseRepository = AppDataSource.getRepository(Course)
        const gradeRepository = AppDataSource.getRepository(Grade)
        const ratingRepository = AppDataSource.getRepository(Rating)

        const course = await courseRepository.createQueryBuilder("grade")
                                             .select(["grade.id", "grade.name", "grade.duration", "grade.created_at"])
                                             .where("grade.id = :id", {
                                                id: params.course_id
                                             })
                                             .getOne()

        const grades = await gradeRepository.createQueryBuilder("grade")
                                            .leftJoinAndSelect("grade.course", "course")
                                            .select(["grade.id", "grade.name", "grade.duration"])
                                            .where("course.id = :id", {
                                                id: params.course_id
                                            })
                                            .getMany()

        const ratings = await ratingRepository.createQueryBuilder("rating")
                                              .leftJoinAndSelect("rating.course", "course")
                                              .leftJoinAndSelect("rating.student", "student")
                                              .select(["rating.id", "rating.description", "student.id", "student.name"])
                                              .where("course.id = :id", {
                                                id: params.course_id
                                              })
                                              .getMany()

        const courseReturn = {
            id: course.id,
            name: course.name,
            duration: course.duration,
            created_at: course.created_at,
            grades: grades,
            ratings: ratings
        }

        return {status: 200, message: courseReturn}
    }

    getAllCourses = async () => {
        const courseRepository = AppDataSource.getRepository(Course)
        const courses = await courseRepository.find()
        // const courses = await courseRepository.createQueryBuilder("grade")
        //                                       .leftJoinAndSelect("grade.course", "course")
        //                                       .select([""])
        //                                       .getMany()

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