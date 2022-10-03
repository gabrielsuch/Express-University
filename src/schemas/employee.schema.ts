import * as yup from "yup"


const createEmployeeSchema = yup.object().shape({
    name: yup.string().required().max(100),
    birthdate: yup.date().required(),
    cpf: yup.string().required().length(14).matches(/^[0-9]{3}[.][0-9]{3}[.][0-9]{3}[-][0-9]{2}$/),
    telephone: yup.string().optional().length(14).matches(/^[(][0-9]{2}[)]\s[0-9]{4}[-][0-9]{4}/),
    cellphone: yup.string().required().length(15).matches(/^[(][0-9]{2}[)]\s[0-9]{5}[-][0-9]{4}/),
    sex: yup.string().optional(),
    email: yup.string().required().email(),
    password: yup.string().required()
})

const updateEmployeeSchema = yup.object().shape({
    name: yup.string().optional().max(100),
    birthdate: yup.date().optional(),
    cpf: yup.string().optional().length(14).matches(/^[0-9]{3}[.][0-9]{3}[.][0-9]{3}[-][0-9]{2}$/),
    telephone: yup.string().optional().length(14).matches(/^[(][0-9]{2}[)]\s[0-9]{4}[-][0-9]{4}/),
    cellphone: yup.string().optional().length(15).matches(/^[(][0-9]{2}[)]\s[0-9]{5}[-][0-9]{4}/),
    sex: yup.string().optional(),
    email: yup.string().optional().email(),
    password: yup.string().optional()
})

const loginEmployeeSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required()
})

const serializedShowOneEmployeeSchema = yup.object().shape({
    id: yup.string().uuid().required(),
    name: yup.string().required(),
    birthdate: yup.date().required(),
    cpf: yup.string().required(),
    telephone: yup.string().required(),
    cellphone: yup.string().required(),
    sex: yup.string().required(),
    email: yup.string().required().email(),
    is_adm: yup.boolean().required()
})

const serializedShowAllEmployeeSchema = yup.array().of(
    yup.object().shape({
        id: yup.string().uuid().required(),
        name: yup.string().required(),
        birthdate: yup.date().required(),
        cpf: yup.string().required(),
        telephone: yup.string().required(),
        cellphone: yup.string().required(),
        sex: yup.string().required(),
        email: yup.string().required().email(),
        is_adm: yup.boolean().required()
    })
)


export {createEmployeeSchema, updateEmployeeSchema, loginEmployeeSchema, serializedShowOneEmployeeSchema, serializedShowAllEmployeeSchema}