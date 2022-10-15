import express from 'express'
import {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from './controller'
import { validateSchema } from './middlewares'
import { CreateProductSchema, IdSchema, UpdateProductShema } from './validators'

const router = express.Router()

router.get('/', getProducts)
router.get('/:id', validateSchema(IdSchema, 'params'), getProduct)
router.post('/', validateSchema(CreateProductSchema, 'body'), createProduct)
router.patch(
  '/:id',
  validateSchema(IdSchema, 'params'),
  validateSchema(UpdateProductShema, 'body'),
  updateProduct
)
router.delete('/:id', validateSchema(IdSchema, 'params'), deleteProduct)

export default router
