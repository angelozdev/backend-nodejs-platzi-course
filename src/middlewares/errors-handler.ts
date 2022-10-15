import { ErrorRequestHandler } from 'express'
import boom from '@hapi/boom'

export const errorsHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (boom.isBoom(err)) {
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  }

  res
    .status(err.status || err.statusCode || 500)
    .json(boom.serverUnavailable('Something went wrong'))
}
