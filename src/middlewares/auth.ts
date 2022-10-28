import { RequestHandler } from 'express'
import boom from '@hapi/boom'
import EV from '../constants/ev'

export const checkAuthorizationToken: RequestHandler = (req, res, next) => {
  const { api_key } = req.headers
  if (api_key && api_key === EV.API_KEY) next()
  else next(boom.unauthorized('Invalid token'))
}
