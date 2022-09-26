import * as yup from "yup"


const createTypeCourseSchema = yup.object().shape({
    name: yup.string().required().max(100)
})

const updateTypeCourseSchema = yup.object().shape({
    name: yup.string().optional().max(100)
})


export {createTypeCourseSchema, updateTypeCourseSchema}