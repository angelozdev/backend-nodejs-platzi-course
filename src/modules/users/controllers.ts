import { RequestHandler } from 'express'
import boom from '@hapi/boom'
import usersServices from './services'
import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { exclude } from '../../utils/db'

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await usersServices.getById(+id)
    res.status(200).json(user)
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
    const encodedPassword = await bcrypt.hash(password, 10)
    const user = await usersServices.createOne({
      email,
      password: encodedPassword,
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
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    )
    if (!isPasswordCorrect) throw boom.unauthorized('Invalid password')
    const updatedUser = await usersServices.updateOne(+id, {
      email,
      password: newPassword
        ? await bcrypt.hash(newPassword, 10)
        : user.password,
      name
    })

    res.status(200).json(updatedUser)
  } catch (error) {
    next(error)
  }
}
