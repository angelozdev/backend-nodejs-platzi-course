import jwt from 'jsonwebtoken'
import boom from '@hapi/boom'
import EV from '../constants/ev'

export function signToken(
  payload: string | Buffer | object,
  options?: jwt.SignOptions
): string {
  if (!EV.JWT_SECRET) throw boom.internal('JWT_SECRET is not defined')
  return jwt.sign(payload, EV.JWT_SECRET, options)
}

export function verifyToken<T>(token: string, options?: jwt.VerifyOptions): T {
  if (!EV.JWT_SECRET) throw boom.internal('JWT_SECRET is not defined')
  try {
    const payload = jwt.verify(token, EV.JWT_SECRET, options) as T
    return payload
  } catch (error) {
    throw boom.unauthorized('Invalid token')
  }
}
