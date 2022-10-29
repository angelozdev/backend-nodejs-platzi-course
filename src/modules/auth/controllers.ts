import { User } from '@prisma/client'
import { RequestHandler } from 'express'
import { exclude } from '../../utils/db'
import { signToken, verifyToken } from '../../utils/jwt'
import userServices from '../users/services'

const SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7 // 7 days
const FIFTEEN_MIN = 1000 * 60 * 15 // 15 minutes

export const login: RequestHandler = (req, res) => {
  const userWithoutPassword = exclude(req.user as User, 'password')
  const payload = {
    sub: userWithoutPassword.id,
    role: userWithoutPassword.roleId
  }

  const accessToken = signToken(payload, { expiresIn: FIFTEEN_MIN })
  const refreshToken = signToken(
    { sub: userWithoutPassword.id },
    { expiresIn: SEVEN_DAYS }
  )

  res.status(200).json({
    user: userWithoutPassword,
    accessToken: {
      token: accessToken,
      expiresAt: Date.now() + FIFTEEN_MIN
    },
    refreshToken: {
      token: refreshToken,
      expiresAt: Date.now() + SEVEN_DAYS
    }
  })
}

export const regenerateAccessToken: RequestHandler = async (req, res, next) => {
  const { refreshToken } = req.body

  try {
    const { sub } = verifyToken<{ sub: string }>(refreshToken)
    const user = await userServices.getById(+sub)
    const payload = {
      sub: user.id,
      role: user.roleId
    }

    const accessToken = signToken(payload, { expiresIn: FIFTEEN_MIN })
    res.status(200).json({
      accessToken: {
        token: accessToken,
        expiresAt: Date.now() + FIFTEEN_MIN
      }
    })
  } catch (error) {
    next(error)
  }
}
