import { faker } from '@faker-js/faker'
import { Product } from '@prisma/client'
import prisma from '../src/libs/prisma-client'

async function seed(count = 10) {
  const products: Omit<Product, 'id'>[] = Array.from({ length: count }, () => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: +faker.commerce.price(),
    image: faker.image.imageUrl(),
    createdAt: faker.date.past(),
    updatedAt: new Date()
  }))

  const createdProducts = await prisma.product.createMany({
    data: products
  })

  return createdProducts
}

async function main() {
  const createdProducts = await seed(10)
  console.log(createdProducts)
}

main()
