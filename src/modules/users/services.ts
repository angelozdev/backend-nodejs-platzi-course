import { User } from '.prisma/client'
import boom from '@hapi/boom'
import prisma from '../../libs/prisma-client'
import { hashPassword } from '../../utils/password'

async function getById(id: number) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      role: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })
  if (!user) throw boom.notFound(`User with id ${id} not found`)
  return user
}

async function getByEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) throw boom.notFound(`User with email ${email} not found`)
  return user
}

async function createOne(
  userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>
) {
  const hashedPassword = await hashPassword(userData.password)
  const user = await prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  })
  return user
}

async function updateOne(
  id: number,
  userData: Omit<Partial<User>, 'updatedAt' | 'id' | 'createdAt'>
) {
  const user = await prisma.user.update({
    where: { id },
    data: {
      ...userData,
      updatedAt: new Date()
    }
  })
  return user
}

async function deleteOne(id: number) {
  const user = await prisma.user.delete({ where: { id } })
  if (!user) throw boom.notFound(`User with id ${id} not found`)
  return user
}

const userServices = {
  getById,
  getByEmail,
  createOne,
  updateOne,
  deleteOne
}

export default userServices
