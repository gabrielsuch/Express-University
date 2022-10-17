import {Request} from "express"

import {AppDataSource} from "../data-source"
import {Rating} from "../entities/rating.entity"
import {Course} from "../entities/course.entity"
import {Student} from "../entities/student.entity"

import {serializedShowOneRatingSchema, serializedShowAllRatingsSchema, serializedCreateRatingSchema} from "../schemas/rating.schema"


class RatingService {
    getRating = async ({params}: Request) => {
        const ratingRepository = AppDataSource.getRepository(Rating)
        const rating = await ratingRepository.createQueryBuilder("rating")
                                             .leftJoinAndSelect("rating.student", "student")
                                             .select(["rating.id", "rating.description", "student.id", "student.name"])
                                             .where("rating.id = :id", {
                                                id: params.rating_id
                                             })
                                             .getOne()

        return await serializedShowOneRatingSchema.validate(rating, {stripUnknown: true})
    }

    getRatings = async () => {
        const ratingRepository = AppDataSource.getRepository(Rating)
        const ratings = await ratingRepository.createQueryBuilder("rating")
                                             .leftJoinAndSelect("rating.student", "student")
                                             .select(["rating.id", "rating.description", "student.id", "student.name"])
                                             .orderBy("rating.created_at", "DESC")
                                             .getMany()

        return await serializedShowAllRatingsSchema.validate(ratings, {stripUnknown: true})
    }

    createRating = async ({validated, params, decoded}: Request) => {
        const ratingRepository = AppDataSource.getRepository(Rating)

        const courseRepository = AppDataSource.getRepository(Course)
        const course = await courseRepository.findOneBy({
            id: params.course_id
        })

        const studentRepository = AppDataSource.getRepository(Student)
        const student = await studentRepository.findOneBy({
            email: decoded
        })        

        const studentInCourse = await AppDataSource.getRepository(Student)
                                                .createQueryBuilder("student")
                                                .leftJoinAndSelect("student.course", "course")
                                                .where("student.id = :id", {
                                                    id: student.id
                                                })
                                                .getOne()
                                                
        if(!studentInCourse.course) {
            return {status: 422, message: {error: "You are not in a Course."}}
        }

        if(studentInCourse.course.id != course.id) {
            return {status: 401, message: {error: "You are not in this Course to make Rating."}}
        } 

        const rating = new Rating()
        rating.description = validated["description"]
        rating.course = course
        rating.student = student

        ratingRepository.create(rating)
        await ratingRepository.save(rating)

        return await serializedCreateRatingSchema.validate(rating, {stripUnknown: true})
    }

    deleteRating = async ({params, decoded}: Request) => {
        const ratingRepository = AppDataSource.getRepository(Rating)
        const rating = await ratingRepository.findOneBy({
            id: params.rating_id
        })

        const studentRepository = AppDataSource.getRepository(Student)
        const student = await studentRepository.findOneBy({
            email: decoded
        })

        if(rating.student.id != student.id) {
            return {status: 401, message: {error: "You don't own this Rating to delete."}}
        }

        await ratingRepository.delete(rating.id)

        return {status: 204, message: ""}
    }
}


export default new RatingService()