import joi from 'joi'

const refreshToken = joi.string().required()

export const regenerateAccessTokenSchema = joi.object({
  refreshToken
})
