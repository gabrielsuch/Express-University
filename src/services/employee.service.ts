import {Request} from "express"

import {AppDataSource} from "../data-source"
import {Employee} from "../entities/employee.entity"


class EmployeeService { 
    createEmployee = async ({body}: Request) => {
        const employeeRepository = AppDataSource.getRepository(Employee)
        
        const employee = new Employee()
        employee.id = body.id
        employee.name = body.name
        employee.birthdate = body.birthdate
        employee.cpf = body.cpf
        employee.telephone = body.telephone
        employee.cellphone = body.cellphone
        employee.created_at = body.created_at
        employee.sex = body.sex
        employee.email = body.email
        employee.password = body.password
        employee.is_adm = body.is_adm

        employeeRepository.create(employee)
        await employeeRepository.save(employee)

        return {status: 201, message: employee}
    }
}


export default new EmployeeService()