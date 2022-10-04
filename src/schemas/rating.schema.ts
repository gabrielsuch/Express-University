import * as yup from "yup"


const createRatingSchema = yup.object().shape({
    description: yup.string().required().max(255)
})

const serializedShowOneRatingSchema = yup.object().shape({
    id: yup.string().uuid().required(),
    description: yup.string().required(),
    student: yup.object().shape({
        id: yup.string().uuid().required(),
        name: yup.string().required()
    })
})

const serializedShowAllRatingsSchema = yup.array().of(
    yup.object().shape({
        id: yup.string().uuid().required(),
        description: yup.string().required(),
        student: yup.object().shape({
            id: yup.string().uuid().required(),
            name: yup.string().required()
        })
    })
)

const serializedCreateRatingSchema = yup.object().shape({
    id: yup.string().uuid().required(),
    description: yup.string().required(),
    course: yup.object().shape({
        id: yup.string().uuid().required(),
        name: yup.string().required(),
    }),
    student: yup.object().shape({
        id: yup.string().uuid().required(),
        name: yup.string().required()
    })
})


export {createRatingSchema, serializedShowOneRatingSchema, serializedShowAllRatingsSchema, serializedCreateRatingSchema}