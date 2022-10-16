import Joi from 'joi'

export const id = Joi.number().integer().positive().required()
export const IdSchema = Joi.object({ id })
