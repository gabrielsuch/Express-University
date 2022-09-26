import * as yup from "yup"


const createCourseSchema = yup.object().shape({
    name: yup.string().required().max(150),
    duration: yup.number().required().positive()
})

const updateCourseSchema = yup.object().shape({
    name: yup.string().optional().max(150),
    duration: yup.number().optional().positive()
})


export {createCourseSchema, updateCourseSchema}