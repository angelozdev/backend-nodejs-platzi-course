import Joi from 'joi'

const name = Joi.string().min(3).max(30).required()
const email = Joi.string().email().required()
const password = Joi.string().min(6).max(30).required()
const roleId = Joi.number().positive()

export const NewUserSchema = Joi.object({
  name,
  email,
  password,
  roleId
})

export const UpdateUserSchema = Joi.object({
  name: name.optional(),
  email: email.optional(),
  currentPassword: password,
  roleId: roleId.optional(),
  newPassword: password.optional()
})
