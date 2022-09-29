import {Request} from "express"

import {AppDataSource} from "../data-source"
import {Rating} from "../entities/rating.entity"
import {Course} from "../entities/course.entity"
import {Student} from "../entities/student.entity"


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

        return {status: 200, message: rating}
    }

    getRatings = async () => {
        const ratingRepository = AppDataSource.getRepository(Rating)
        const ratings = await ratingRepository.createQueryBuilder("rating")
                                             .leftJoinAndSelect("rating.student", "student")
                                             .select(["rating.id", "rating.description", "student.id", "student.name"])
                                             .getMany()

        return {status: 200, message: ratings}
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

        const userInCourse = await AppDataSource.getRepository(Student)
                                                .createQueryBuilder("student")
                                                .leftJoinAndSelect("student.course", "course")
                                                .where("student.id = :id", {
                                                    id: student.id
                                                })
                                                .getOne()
                                                
        if(!userInCourse.course) {
            return {status: 404, message: {error: "You are not in a Course."}}
        }

        if(userInCourse.course.id != course.id) {
            return {status: 401, message: {error: "You are not in this Course to make Rating."}}
        } 

        const rating = new Rating()
        rating.description = validated["description"]
        rating.course = course
        rating.student = student

        ratingRepository.create(rating)
        await ratingRepository.save(rating)

        return {status: 201, message: validated}
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