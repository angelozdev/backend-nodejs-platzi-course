import { RequestHandler } from 'express'
import boom from '@hapi/boom'
import usersServices from './services'
import { User } from '@prisma/client'
import { exclude } from '../../utils/db'
import { comparePassword, hashPassword } from '../../utils/password'

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await usersServices.getById(+id)
    const userWithoutPassword = exclude(user, 'password')
    res.status(200).json(userWithoutPassword)
  } catch (error) {
    next(error)
  }
}

export const createUser: RequestHandler<any, any, User> = async (
  req,
  res,
  next
) => {
  try {
    const { email, password, name } = req.body
    const user = await usersServices.createOne({
      email,
      password,
      name,
      roleId: 1
    })

    const userWithoutPassword = exclude(user, 'password')
    res.status(201).json(userWithoutPassword)
  } catch (error) {
    next(error)
  }
}

export const updateUser: RequestHandler<
  { id: string },
  any,
  Partial<User> & { newPassword: string; currentPassword: string }
> = async (req, res, next) => {
  try {
    const { id } = req.params
    const { email, currentPassword, name, newPassword } = req.body
    const user = await usersServices.getById(+id)
    const isPasswordCorrect = await comparePassword(
      currentPassword,
      user.password
    )
    if (!isPasswordCorrect) throw boom.unauthorized('Invalid password')
    const updatedUser = await usersServices.updateOne(+id, {
      email,
      password: newPassword ? await hashPassword(newPassword) : user.password,
      name
    })

    res.status(200).json(updatedUser)
  } catch (error) {
    next(error)
  }
}
