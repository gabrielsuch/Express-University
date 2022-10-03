import * as yup from "yup"


const createCourseSchema = yup.object().shape({
    name: yup.string().required().max(150),
})

const updateCourseSchema = yup.object().shape({
    name: yup.string().optional().max(150),
})


export {createCourseSchema, updateCourseSchema}