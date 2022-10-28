import passport from 'passport'
import boom from '@hapi/boom'
import { Strategy as LocalStrategy } from 'passport-local'

import usersServices from '../services'
import { comparePassword } from '../../../utils/password'

export const localStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  async (email, password, done) => {
    try {
      const user = await usersServices.getByEmail(email)
      if (!user) {
        return done(boom.unauthorized('Invalid email or password'), null)
      }

      const isPasswordCorrect = await comparePassword(password, user.password)
      if (!isPasswordCorrect) return done(boom.unauthorized(), null)

      return done(null, user)
    } catch (error) {
      done(error)
    }
  }
)

passport.use('local', localStrategy)
