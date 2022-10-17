import boom from '@hapi/boom'
import { RequestHandler } from 'express'
import { TParams } from '../../typings/product'
import ordersService from './services'

export const getOrder: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    const order = await ordersService.getById(Number(id))
    if (!order) throw boom.notFound(`Order with id ${id} not found`)
    res.status(200).json(order)
  } catch (error) {
    next(error)
  }
}

export const getOrders: RequestHandler<any, any, any, TParams> = async (
  req,
  res,
  next
) => {
  try {
    const { limit = 10, offset = 0 } = req.query
    const orders = await ordersService.getMany({ limit, offset })
    res.status(200).json(orders)
  } catch (error) {
    next(error)
  }
}

export const createOrder: RequestHandler<
  any,
  any,
  {
    userId: number
    products: {
      id: number
      quantity: number
    }[]
  }
> = async (req, res, next) => {
  try {
    const order = await ordersService.createOne(req.body)
    if (!order) throw boom.badRequest(`Order not created`)
    res.status(201).json(order)
  } catch (error) {
    next(error)
  }
}

export const addProductsToOrder: RequestHandler<
  { id: string },
  any,
  {
    products: Array<{
      id: number
      quantity: number
    }>
  }
> = async (req, res, next) => {
  try {
    const { products } = req.body
    const { id } = req.params
    const order = await ordersService.addProducts(+id, products)
    if (!order) throw boom.badRequest(`Product not added to order`)
    res.status(201).json(order)
  } catch (error) {
    next(error)
  }
}

export const getOrderProducts: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    const order = await ordersService.getProducts(Number(id))
    if (!order) throw boom.notFound(`Order with id ${id} not found`)
    res.status(200).json(order)
  } catch (error) {
    next(error)
  }
}
