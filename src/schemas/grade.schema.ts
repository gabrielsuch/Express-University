import * as yup from "yup"


const createGradeSchema = yup.object().shape({
    name: yup.string().required().max(100),
    duration: yup.number().required().positive()
})

const updateGradeSchema = yup.object().shape({
    name: yup.string().optional().max(100),
    duration: yup.number().optional().positive()
})

const serializedShowOneGradeSchema = yup.object().shape({
    id: yup.string().uuid().required(),
    name: yup.string().required(),
    duration: yup.number().positive().required(),
    teacher: yup.object().shape({
        id: yup.string().uuid().optional(),
        name: yup.string().optional()
    }).nullable().optional()
}).required()

const serializedShowAllGradesSchema = yup.array().of(
    yup.object().shape({
        id: yup.string().uuid().required(),
        name: yup.string().required(),
        duration: yup.number().positive().required(),
        teacher: yup.object().shape({
            id: yup.string().uuid().optional(),
            name: yup.string().optional()
        }).optional().nullable()
    }).required()
)

const serializedCreateOrUpdateGradeSchema = yup.object().shape({
    id: yup.string().uuid().required(),
    name: yup.string().required(),
    duration: yup.number().positive(),
    teacher: yup.object().shape({
        id: yup.string().uuid().optional(),
        name: yup.string().optional()
    }).optional().nullable()
})


export {createGradeSchema, updateGradeSchema, serializedShowOneGradeSchema, serializedShowAllGradesSchema, serializedCreateOrUpdateGradeSchema}