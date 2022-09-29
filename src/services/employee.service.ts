import {Request} from "express"

import {AppDataSource} from "../data-source"
import {Employee} from "../entities/employee.entity"

import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

import dotenv from "dotenv"


dotenv.config()


class EmployeeService { 
    getCurrentEmployee = async ({decoded}: Request) => {
        const employeeRepository = AppDataSource.getRepository(Employee)
        const currentEmployee = await employeeRepository.findOneBy({
            email: decoded
        })

        return {status: 200, message: currentEmployee}
    }

    getEmployee = async ({params}: Request) => {
        const employeeRepository = AppDataSource.getRepository(Employee)
        const employeeExists = await employeeRepository.findOneBy({
            id: params.id
        })

        if(!employeeExists) {
            return {status: 404, message: {error: "Employee not found."}}
        }

        return {status: 200, message: employeeExists}
    }

    getAllEmployees = async () => {
        const employeeRepository = AppDataSource.getRepository(Employee)
        const employees = await employeeRepository.find()

        return {status: 200, message: employees}
    }

    createEmployee = async ({validated}: Request) => {
        const employeeRepository = AppDataSource.getRepository(Employee)
        
        const employee = new Employee()
        employee.name = validated["name"]
        employee.birthdate = validated["birthdate"]
        employee.cpf = validated["cpf"]
        employee.telephone = validated["telephone"]
        employee.cellphone = validated["cellphone"]
        employee.sex = validated["sex"]
        employee.email = validated["email"]
        employee.password = await bcrypt.hash(validated["password"], 10)
        employee.is_adm = validated["is_adm"]

        employeeRepository.create(employee)
        await employeeRepository.save(employee)

        return {status: 201, message: employee}
    }

    updateEmployee = async ({body, params}: Request) => {
        const employeeRepository = AppDataSource.getRepository(Employee)
        const employeeExists = await employeeRepository.findOneBy({
            id: params.id
        })

        if(!employeeExists) {
            return {status: 404, message: {error: "Employee not found."}}
        }

        if(body.password) {
            body.password = await bcrypt.hash(body.password, 10)
        }

        await employeeRepository.update(employeeExists.id, body)

        const updatedEmployee = await employeeRepository.findOneBy({
            id: params.id
        })

        return {status: 200, message: updatedEmployee}
    }

    deleteEmployee = async ({params}: Request) => {
        const employeeRepository = AppDataSource.getRepository(Employee)
        const employeeExists = await employeeRepository.findOneBy({
            id: params.id
        })

        if(!employeeExists) {
            return {status: 404, message: {error: "Employee not found."}}
        }

        await employeeRepository.delete(employeeExists.id)

        return {status: 204, message: ""}
    }

    login = async ({body}: Request) => {
        const employeeRepository = AppDataSource.getRepository(Employee)    
        const employee = await employeeRepository.findOneBy({
            email: body.email
        })

        if(!employee) {
            return {status: 404, message: {error: "Email not found."}}
        }

        if(!await bcrypt.compare(body.password, employee.password)) {
            return {status: 400, message: {error: "Email or Password doesn't matches."}}
        }

        const token = jwt.sign({email: body.email}, String(process.env.SECRET_KEY), {expiresIn: "12h"})
        
        return {status: 200, message: {accessToken: token}}
    }
}


export default new EmployeeService()