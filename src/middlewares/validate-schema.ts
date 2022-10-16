import { Request, RequestHandler } from 'express'
import { type Schema } from 'joi'
import boom from '@hapi/boom'

function validateSchema<T>(
  schema: Schema<T>,
  property: keyof Request
): RequestHandler {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req[property])
      if (error) throw boom.badRequest(error.message)

      next()
    } catch (error) {
      console.error('[validate-schema]', error)
      if (error instanceof Error) next(boom.badRequest(error.message))
      next(error)
    }
  }
}

export default validateSchema
