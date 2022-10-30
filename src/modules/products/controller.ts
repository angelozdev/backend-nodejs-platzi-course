import { type RequestHandler } from 'express'
import boom from '@hapi/boom'
import { IResponse, TParams } from '../../typings/product'
import productServices from './services'
import { type Product } from '.prisma/client'

export const getProducts: RequestHandler<any, any, any, TParams> = async (
  req,
  res,
  next
) => {
  try {
    const { limit: _limit = 10, offset: _offset = 0 } = req.query
    const limit = Number(_limit) || 10
    const offset = Number(_offset) || 0

    if (limit > 50) throw boom.badData('Limit must be less than 50')
    if (offset < 0) throw boom.badData('Offset must be greater than 0')
    if (limit < 0) throw boom.badData('Limit must be greater than 0')

    const products = await productServices.getAll({
      limit,
      offset
    })

    const response: IResponse<Product> = {
      count: products.length,
      data: products,
      next:
        products.length === limit
          ? `/?limit=${limit}&offset=${offset + limit}`
          : null,
      previous: offset > 0 ? `/?limit=${limit}&offset=${offset - limit}` : null
    }

    res.json(response).status(200)
  } catch (error) {
    next(error)
  }
}

export const getProduct: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await productServices.getOne(+id)
    if (!product) throw boom.notFound(`Product with id ${id} not found`)
    res.json(product).status(200)
  } catch (error) {
    next(error)
  }
}

export const createProduct: RequestHandler<
  any,
  any,
  Omit<Product, 'id'>
> = async (req, res, next) => {
  try {
    const { name, description, price, image, categoryId } = req.body
    const createdProduct = await productServices.createOne({
      name,
      description,
      price: +price,
      image,
      createdAt: new Date(),
      updatedAt: new Date(),
      categoryId
    })

    res.status(201).json(createdProduct)
  } catch (error) {
    next(error)
  }
}

export const updateProduct: RequestHandler<
  { id: string },
  any,
  Partial<Product>
> = async (req, res, next) => {
  const { id } = req.params
  const { name, description, price, image } = req.body

  try {
    const product = await productServices.getOne(+id)
    if (!product) throw boom.notFound(`Product with id ${id} not found`)
    const updatedProduct = await productServices.updateOne(+id, {
      name,
      description,
      price,
      image
    })
    res.status(200).json(updatedProduct)
  } catch (error) {
    next(error)
  }
}

export const deleteProduct: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params
    const deletedProduct = await productServices.deleteOne(+id)
    res.status(204).json(deletedProduct)
  } catch (error) {
    next(error)
  }
}
