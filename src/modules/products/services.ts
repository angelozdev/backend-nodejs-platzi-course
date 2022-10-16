import { TParams } from '../../typings/product'
import boom from '@hapi/boom'
import prisma from '../../libs/prisma-client'
import { Product } from '@prisma/client'

export async function getOne(id: number): Promise<Product> {
  const product = await prisma.product.findUnique({
    where: {
      id
    }
  })
  if (!product) throw boom.notFound(`Product with id ${id} not found`)
  return product
}

export async function getAll(params: TParams): Promise<Product[]> {
  const { limit = 10, offset = 0 } = params
  const products = await prisma.product.findMany({
    take: limit,
    skip: offset
  })

  return products
}

export async function createOne(
  productData: Omit<Product, 'id'>
): Promise<Product> {
  const createdProduct = await prisma.product.create({
    data: productData
  })

  return createdProduct
}

export async function updateOne(
  id: number,
  product: Omit<Partial<Product>, 'id' | 'updatedAt'>
): Promise<Product> {
  const updatedProduct = await prisma.product.update({
    where: { id },
    data: {
      ...product,
      updatedAt: new Date()
    }
  })

  if (!updatedProduct) throw boom.notFound(`Product with id ${id} not found`)
  return updatedProduct
}

export async function deleteOne(id: number): Promise<Product> {
  const deletedProduct = await prisma.product.delete({
    where: { id }
  })

  if (!deletedProduct) throw boom.notFound(`Product with id ${id} not found`)
  return deletedProduct
}

const services = {
  getOne,
  getAll,
  createOne,
  updateOne,
  deleteOne
}

export default services
