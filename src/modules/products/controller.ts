import { type RequestHandler } from 'express'
import boom from '@hapi/boom'
import {
  IProduct,
  IProductToCreate,
  IResponse,
  TParams
} from '../../typings/product'
import productServices from './services'

export const getProducts: RequestHandler<any, any, any, TParams> = async (
  req,
  res,
  next
) => {
  try {
    const { limit, offset } = req.query
    if (Number(limit) > 50) throw boom.badData('Limit must be less than 50')
    const products = await productServices.getAll({
      limit: Number(limit) || 10,
      offset: Number(offset) || 0
    })

    const response: IResponse<IProduct> = {
      count: products.length,
      data: products,
      next: null,
      previous: null
    }

    res.json(response).status(200)
  } catch (error) {
    next(error)
  }
}

export const getProduct: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await productServices.getOne(id)
    if (!product) throw boom.notFound(`Product with id ${id} not found`)
    res.json(product).status(200)
  } catch (error) {
    next(error)
  }
}

export const createProduct: RequestHandler<any, any, IProductToCreate> = async (
  req,
  res,
  next
) => {
  try {
    const { name, description, price, image } = req.body
    const productData = {
      name,
      description,
      price,
      image
    }

    const createdProduct = await productServices.createOne(productData)
    res.status(201).json(createdProduct)
  } catch (error) {
    next(error)
  }
}

export const updateProduct: RequestHandler<
  { id: string },
  any,
  Partial<IProductToCreate>
> = async (req, res, next) => {
  const { id } = req.params
  const { name, description, price, image } = req.body

  try {
    const product = await productServices.getOne(id)
    if (!product) throw boom.notFound(`Product with id ${id} not found`)
    const productData = {
      name: name || product.name,
      description: description || product.description,
      price: price || product.price,
      image: image || product.image
    }
    const updatedProduct = await productServices.updateOne(id, productData)
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
    await productServices.deleteOne(id)
    res.status(204).json()
  } catch (error) {
    next(error)
  }
}
