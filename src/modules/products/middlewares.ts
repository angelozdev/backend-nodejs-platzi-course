import { RequestHandler, Request } from 'express'
import { assert, Struct } from 'superstruct'
import boom from '@hapi/boom'

export function validateSchema<T>(
  schema: Struct<T>,
  property: keyof Request
): RequestHandler {
  return (req, res, next) => {
    try {
      assert(req[property], schema)
      next()
    } catch (error) {
      console.error(error)
      if (error instanceof Error) next(boom.badRequest(error.message))
      next(error)
    }
  }
}
