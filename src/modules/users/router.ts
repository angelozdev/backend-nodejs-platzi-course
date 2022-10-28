import './utils/strategies'
import express from 'express'
import passport from 'passport'

import { NewUserSchema, UpdateUserSchema } from './utils/validators'
import { getUser, updateUser, createUser } from './controllers'
import { validateSchema } from '../../middlewares'
import { IdSchema } from '../../utils/commom-validators'
import { checkAuthorizationToken } from '../../middlewares/auth'
import { exclude } from '../../utils/db'
import { User } from '@prisma/client'

const router = express.Router()

router.get('/:id', checkAuthorizationToken, getUser)
router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    const userWithoutPassword = exclude(req.user as User, 'password')
    res.status(200).json(userWithoutPassword)
  }
)
router.post('/', validateSchema(NewUserSchema, 'body'), createUser)
router.patch(
  '/:id',
  validateSchema(IdSchema, 'params'),
  validateSchema(UpdateUserSchema, 'body'),
  updateUser
)

export default router
