import boom from '@hapi/boom'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'

import usersServices from '../../users/services'
import { comparePassword } from '../../../utils/password'
import EV from '../../../constants/ev'

export const localStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  async (email, password, done) => {
    try {
      const user = await usersServices.getByEmail(email)
      if (!user)
        return done(boom.unauthorized('Invalid email or password'), false)

      const isPasswordCorrect = await comparePassword(password, user.password)
      if (!isPasswordCorrect) return done(boom.unauthorized(), false)

      return done(null, user)
    } catch (error) {
      done(error)
    }
  }
)

export const jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: EV.JWT_SECRET
  },
  async (payload, done) => {
    try {
      const user = await usersServices.getById(+payload.sub)
      done(null, user)
    } catch (error) {
      done(error)
    }
  }
)
