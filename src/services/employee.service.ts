import {Request} from "express"

import {AppDataSource} from "../data-source"
import {Employee} from "../entities/employee.entity"

import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

import dotenv from "dotenv"

import {serializedShowOneEmployeeSchema, serializedShowAllEmployeeSchema, serializedCreateOrUpdateEmployeeSchema} from "../schemas/employee.schema"


dotenv.config()


class EmployeeService { 
    getCurrentEmployee = async ({decoded}: Request) => {
        const employeeRepository = AppDataSource.getRepository(Employee)
        const currentEmployee = await employeeRepository.findOneBy({
            email: decoded
        })

        return await serializedShowOneEmployeeSchema.validate(currentEmployee, {stripUnknown: true})
    }

    getEmployee = async ({params}: Request) => {
        const employeeRepository = AppDataSource.getRepository(Employee)
        const employee = await employeeRepository.findOneBy({
            id: params.id
        })

        return await serializedShowOneEmployeeSchema.validate(employee, {stripUnknown: true})
    }

    getAllEmployees = async () => {
        const employeeRepository = AppDataSource.getRepository(Employee)
        const employees = await employeeRepository.find()

        return await serializedShowAllEmployeeSchema.validate(employees, {stripUnknown: true})
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

        return await serializedCreateOrUpdateEmployeeSchema.validate(employee, {stripUnknown: true})
    }

    updateEmployee = async ({validated, params}: Request) => {
        const employeeRepository = AppDataSource.getRepository(Employee)
        const employee = await employeeRepository.findOneBy({
            id: params.id
        })

        if(validated["password"]) {
            validated["password"] = await bcrypt.hash(validated["password"], 10)
        }

        await employeeRepository.update(employee.id, {...validated as Employee})

        const updatedEmployee = await employeeRepository.findOneBy({
            id: params.id
        })

        return await serializedCreateOrUpdateEmployeeSchema.validate(updatedEmployee, {stripUnknown: true})
    }

    deleteEmployee = async ({params}: Request) => {
        const employeeRepository = AppDataSource.getRepository(Employee)
        const employee = await employeeRepository.findOneBy({
            id: params.id
        })

        await employeeRepository.delete(employee.id)

        return {status: 204, message: ""}
    }

    login = async ({validated}: Request) => {
        const employeeRepository = AppDataSource.getRepository(Employee)    
        const employee = await employeeRepository.findOneBy({
            email: validated["email"]
        })

        if(!employee) {
            return {status: 404, message: {error: "Email not found."}}
        }

        if(!await bcrypt.compare(validated["password"], employee.password)) {
            return {status: 400, message: {error: "Email or Password doesn't matches."}}
        }

        const token = jwt.sign({email: validated["email"]}, String(process.env.SECRET_KEY), {expiresIn: "12h"})
        
        return {status: 200, message: {accessToken: token}}
    }
}


export default new EmployeeService()