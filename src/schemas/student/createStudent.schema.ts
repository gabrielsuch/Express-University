import * as yup from "yup"


const createStudentSchema = yup.object().shape({
    name: yup.string().required().max(100),
    birthdate: yup.date().required(),
    cpf: yup.string().required().max(14),
    telephone: yup.string().required().max(14),
    cellphone: yup.string().required().max(15),
    sex: yup.string().optional(),
    email: yup.string().required().email(),
    password: yup.string().required()
})

export default createStudentSchema