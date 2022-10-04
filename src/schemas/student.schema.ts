import * as yup from "yup"


const createStudentSchema = yup.object().shape({
    name: yup.string().required().max(100),
    birthdate: yup.date().required(),
    cpf: yup.string().required().length(14).matches(/^[0-9]{3}[.][0-9]{3}[.][0-9]{3}[-][0-9]{2}$/),
    telephone: yup.string().optional().max(14).matches(/^[(][0-9]{2}[)]\s[0-9]{4}[-][0-9]{4}/),
    cellphone: yup.string().optional().length(15).matches(/^[(][0-9]{2}[)]\s[0-9]{5}[-][0-9]{4}/),
    sex: yup.string().optional(),
    email: yup.string().required().email(),
    password: yup.string().required()
})

const updateStudentSchema = yup.object().shape({
    name: yup.string().optional().max(100),
    birthdate: yup.date().optional(),
    cpf: yup.string().optional().length(14).matches(/^[0-9]{3}[.][0-9]{3}[.][0-9]{3}[-][0-9]{2}$/),
    telephone: yup.string().optional().length(14).matches(/^[(][0-9]{2}[)]\s[0-9]{4}[-][0-9]{4}/),
    cellphone: yup.string().optional().length(15).matches(/^[(][0-9]{2}[)]\s[0-9]{5}[-][0-9]{4}/),
    sex: yup.string().optional(),
    email: yup.string().optional().email(),
    password: yup.string().optional()
})

const loginStudentSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required()
})

const serializedShowOneStudentSchema = yup.object().shape({
    id: yup.string().uuid().required(),
    name: yup.string().required(),
    birthdate: yup.date().required(),
    cpf: yup.string().required(),
    telephone: yup.string().optional().nullable(),
    cellphone: yup.string().optional().nullable(),
    created_at: yup.date().required(),
    sex: yup.string().required(),
    email: yup.string().required().email(),
    // course: yup.object().shape({
    //     id: yup.string().uuid().optional(),
    //     name: yup.string().optional()
    // }).nullable().optional()
})

const serializedShowAllStudentSchema = yup.array().of(
    yup.object().shape({
        id: yup.string().uuid().required(),
        name: yup.string().required(),
        birthdate: yup.date().required(),
        cpf: yup.string().required(),
        telephone: yup.string().optional().nullable(),
        cellphone: yup.string().optional().nullable(),
        created_at: yup.date().required(),
        sex: yup.string().required(),
        email: yup.string().required().email(),
        // course: yup.object().shape({
        //     id: yup.string().uuid().optional(),
        //     name: yup.string().optional()
        // }).nullable().optional()
    })
)

const serializedCreateOrUpdateStudentSchema = yup.object().shape({
    id: yup.string().uuid().required(),
    name: yup.string().required(),
    birthdate: yup.date().required(),
    cpf: yup.string().required(),
    telephone: yup.string().optional().nullable(),
    cellphone: yup.string().optional().nullable(),
    created_at: yup.date().required(),
    sex: yup.string().required(),
    email: yup.string().required().email()
})


export {createStudentSchema, updateStudentSchema, loginStudentSchema, serializedShowOneStudentSchema, serializedShowAllStudentSchema, serializedCreateOrUpdateStudentSchema}