import express from 'express'
import passport from 'passport'
import { validateSchema } from '../../middlewares'
import { login, regenerateAccessToken } from './controllers'
import { localStrategy } from './utils/strategies'
import { regenerateAccessTokenSchema } from './utils/validators'

const router = express.Router()

router.post(
  '/login',
  passport.authenticate(localStrategy, { session: false }),
  login
)

router.post(
  '/access-token',
  validateSchema(regenerateAccessTokenSchema, 'body'),
  regenerateAccessToken
)

export default router
