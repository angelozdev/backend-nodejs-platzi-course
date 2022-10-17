import express from 'express'
import {
  getOrder,
  createOrder,
  getOrders,
  addProductsToOrder,
  getOrderProducts
} from './controllers'

const router = express.Router()
router.get('/', getOrders)
router.get('/:id', getOrder)
router.get('/:id/products', getOrderProducts)
router.post('/', createOrder)
router.post('/:id/products', addProductsToOrder)

export default router
