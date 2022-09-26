import * as yup from "yup"


const createRatingSchema = yup.object().shape({
    description: yup.string().required().max(255)
})


export {createRatingSchema}