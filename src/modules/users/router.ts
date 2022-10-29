import express from 'express'

import { NewUserSchema, UpdateUserSchema } from './utils/validators'
import { getUser, updateUser, createUser } from './controllers'
import { validateSchema } from '../../middlewares'
import { IdSchema } from '../../utils/commom-validators'
import passport from 'passport'
import { jwtStrategy } from '../auth/utils/strategies'

const router = express.Router()

router.get(
  '/:id',
  passport.authenticate(jwtStrategy, { session: false }),
  getUser
)
router.post('/', validateSchema(NewUserSchema, 'body'), createUser)
router.patch(
  '/:id',
  validateSchema(IdSchema, 'params'),
  validateSchema(UpdateUserSchema, 'body'),
  updateUser
)

export default router
