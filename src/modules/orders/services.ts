import { Order, Prisma as TPrisma, ProductToOrder } from '@prisma/client'
import prisma from '../../libs/prisma-client'
import { IResponse, TParams } from '../../typings/product'

async function getMany(params: TParams): Promise<IResponse<Order>> {
  const { offset, limit } = params
  const orders = await prisma.order.findMany({
    skip: offset,
    take: limit,
    include: {
      products: {
        select: {
          quantity: true,
          product: {
            select: {
              id: true,
              name: true,
              price: true
            }
          }
        }
      },
      user: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })
  return {
    data: orders,
    count: orders.length,
    next: null,
    previous: null
  }
}

async function getById(id: number): Promise<Order | null> {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true
        }
      },
      products: {
        select: {
          quantity: true,
          product: {
            select: {
              id: true,
              name: true,
              price: true
            }
          }
        }
      }
    }
  })
  return order
}

async function createOne(orderData: {
  userId: number
  products: {
    quantity: number
    id: number
  }[]
}): Promise<Order> {
  const createdOrder = await prisma.order.create({
    data: {
      userId: orderData.userId
    }
  })

  await prisma.productToOrder.createMany({
    data: orderData.products.map((product) => ({
      productId: product.id,
      orderId: createdOrder.id,
      quantity: product.quantity
    }))
  })

  const createdOrderWithProducts = await prisma.order.findUniqueOrThrow({
    where: { id: createdOrder.id },
    include: { products: { include: { product: true } } }
  })

  return createdOrderWithProducts
}

async function addProducts(
  id: number,
  products: Array<{
    id: number
    quantity: number
  }>
) {
  const orderProducts = await getProducts(id)
  const existingProductsById = orderProducts.reduce((acc, cur) => {
    acc[cur.productId] = cur
    return acc
  }, {} as Record<number, ProductToOrder>)

  const { existingProducts, newProducts } = products.reduce(
    (acc, cur) => {
      if (!existingProductsById[cur.id]) acc.newProducts.push(cur)
      else acc.existingProducts.push(cur)
      return acc
    },
    {
      existingProducts: [] as typeof products,
      newProducts: [] as typeof products
    }
  )

  await prisma.productToOrder.createMany({
    data: newProducts.map((product) => ({
      productId: product.id,
      orderId: id,
      quantity: product.quantity
    }))
  })

  await Promise.all(
    existingProducts.map((product) => {
      return prisma.productToOrder.update({
        where: { orderId_productId: { orderId: id, productId: product.id } },
        data: { quantity: product.quantity }
      })
    })
  )

  return await prisma.order.findUniqueOrThrow({
    where: { id },
    include: {
      products: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              price: true
            }
          }
        }
      }
    }
  })
}

async function getProducts(orderId: number): Promise<ProductToOrder[]> {
  const products = await prisma.productToOrder.findMany({
    where: { orderId },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          price: true
        }
      }
    }
  })

  return products
}

const ordersService = {
  getMany,
  getById,
  createOne,
  addProducts,
  getProducts
}

export default ordersService
