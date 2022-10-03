import * as yup from "yup"


const createCourseSchema = yup.object().shape({
    name: yup.string().required().max(150),
})

const updateCourseSchema = yup.object().shape({
    name: yup.string().optional().max(150),
})

const serializedCreateCourseSchema = yup.object().shape({
    id: yup.string().uuid().required(),
    name: yup.string().required(),
    duration: yup.number().required(),
    created_at: yup.date().required(),
    updated_at: yup.date().required()
})


export {createCourseSchema, updateCourseSchema, serializedCreateCourseSchema}