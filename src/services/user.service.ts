import {Request} from "express"

import {AppDataSource} from "../data-source"
import {User} from "../entities/user.entity"

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


class UserService {
    // getCurrentUser = async () => {

    // }

    getUsers = async () => {
        const userRepository = AppDataSource.getRepository(User)
        const users = await userRepository.find()

        return {status: 200, message: users}
    }

    createUser = async ({body}: Request) => {
        const userRepository = AppDataSource.getRepository(User)

        const user = new User()
        user.id = body.id
        user.name = body.name
        user.birthdate = body.birthdate
        user.cpf = body.cpf
        user.telephone = body.telephone
        user.cellphone = body.cellphone
        user.created_at = body.created_at
        user.type = body.type
        user.sex = body.sex
        user.email = body.email
        user.password = await bcrypt.hash(body.password, 10)
        user.is_adm = body.is_adm

        userRepository.create(user)
        await userRepository.save(user)

        return {status: 201, message: user}
    }

    login = async ({body}: Request) => {
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOneBy({
            email: body.email
        })

        if(!user) {
            return {status: 404, message: {error: "Email not found."}}
        }

        if(!await bcrypt.compare(body.password, user.password)) {
            return {status: 400, message: {error: "Email or Password doesn't matches."}}
        }
        
        const token = jwt.sign({email: body.email}, String(process.env.SECRET_KEY), {expiresIn: "12h"})
        
        return {status: 200, message: {accessToken: token}}
    }
}


export default new UserService()