import Joi from 'joi'
import { id } from '../../../utils/commom-validators'

const name = Joi.string().min(3).max(30).required()
const description = Joi.string().min(3).max(200)
const price = Joi.number().positive().required()
const image = Joi.string().uri()

export const ProductSchema = Joi.object({
  id,
  name,
  description,
  price,
  image
})

export const CreateProductSchema = Joi.object({
  name,
  description,
  price,
  image
})

export const UpdateProductShema = Joi.object({
  name: name.optional(),
  description: description.optional(),
  price: price.optional(),
  image: image.optional()
})
