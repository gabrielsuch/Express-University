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

const serializedShowCourseSchema = yup.array().of(
    yup.object().shape({
        id: yup.string().uuid().required(),
        name: yup.string().required(),
        duration: yup.number().required(),
        created_at: yup.date().required(),
        updated_at: yup.date().optional(),
        grades: yup.array().of(
            yup.object().shape({
                id: yup.string().uuid().optional(),
                name: yup.string().optional(),
                duration: yup.string().optional(),
            }).optional()
        ),
        ratings: yup.array().of(
            yup.object().shape({
                id: yup.string().uuid().optional(),
                description: yup.string().optional(),
                student: yup.object().shape({
                    id: yup.string().uuid().optional(),
                    name: yup.string().optional()
                })
            }).optional()
        )
    })
)


export {createCourseSchema, updateCourseSchema, serializedCreateCourseSchema, serializedShowCourseSchema}