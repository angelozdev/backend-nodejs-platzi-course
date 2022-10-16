import { ErrorRequestHandler } from 'express'
import boom from '@hapi/boom'

const errorsHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err)
  if (boom.isBoom(err)) {
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  }

  res
    .status(err.status || err.statusCode || 500)
    .json(boom.serverUnavailable('Something went wrong').output.payload)
}

export default errorsHandler
