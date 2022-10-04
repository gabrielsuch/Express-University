import * as yup from "yup"


const createTypeCourseSchema = yup.object().shape({
    name: yup.string().required().max(100)
})

const updateTypeCourseSchema = yup.object().shape({
    name: yup.string().optional().max(100)
})

const serializedShowOneTypeCourseSchema = yup.object().shape({
    id: yup.string().uuid().required(),
    name: yup.string().required(),
    courses: yup.array().of(
        yup.object().shape({
            id: yup.string().uuid().optional(),
            name: yup.string().optional(),
            duration: yup.number().optional(),
            created_at: yup.date().optional(),
            updated_at: yup.date().optional(),
            grades: yup.array().of(
                yup.object().shape({
                    id: yup.string().uuid().optional(),
                    name: yup.string().optional(),
                    duration: yup.number().optional(),
                    teacher: yup.object().shape({
                        id: yup.string().uuid().optional(),
                        name: yup.string().optional(),
                    }).nullable().optional(),
                })
            ).optional(),
            ratings: yup.array().of(
                yup.object().shape({
                    id: yup.string().uuid().optional(),
                    description: yup.string().optional(),
                    student: yup.object().shape({
                        id: yup.string().uuid().optional(),
                        name: yup.string().optional()
                    }).required()
                })
            ).optional(),
        }).nullable().optional()
    )
})

const serializedShowAllTypeCourseSchema = yup.array().of(
    yup.object().shape({
        id: yup.string().uuid().required(),
        name: yup.string().required(),
        courses: yup.array().of(
            yup.object().shape({
                id: yup.string().uuid().optional(),
                name: yup.string().optional(),
                duration: yup.number().optional(),
                created_at: yup.date().optional(),
                updated_at: yup.date().optional(),
                grades: yup.array().of(
                    yup.object().shape({
                        id: yup.string().uuid().optional(),
                        name: yup.string().optional(),
                        duration: yup.number().optional(),
                        teacher: yup.object().shape({
                            id: yup.string().uuid().optional(),
                            name: yup.string().optional(),
                        }).nullable().optional(),
                    })
                ).optional(),
                ratings: yup.array().of(
                    yup.object().shape({
                        id: yup.string().uuid().optional(),
                        description: yup.string().optional(),
                        student: yup.object().shape({
                            id: yup.string().uuid().optional(),
                            name: yup.string().optional()
                        }).required()
                    })
                ).optional(),
            }).nullable().optional()
        )
    })
)

const serializedCreateOrUpdateTypeCourseSchema = yup.object().shape({
    id: yup.string().uuid().required(),
    name: yup.string().required()
})


export {createTypeCourseSchema, updateTypeCourseSchema, serializedShowOneTypeCourseSchema, serializedShowAllTypeCourseSchema, serializedCreateOrUpdateTypeCourseSchema}