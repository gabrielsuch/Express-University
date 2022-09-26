import * as yup from "yup"


const createGradeSchema = yup.object().shape({
    name: yup.string().required().max(100),
    duration: yup.number().required().positive()
})

const updateGradeSchema = yup.object().shape({
    name: yup.string().optional().max(100),
    duration: yup.number().optional().positive()
})


export {createGradeSchema, updateGradeSchema}