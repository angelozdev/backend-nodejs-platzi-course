import { faker } from '@faker-js/faker'
import { IProduct } from '../../typings/product'

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function generateProduct(id?: string): IProduct {
  return {
    id: id || faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
    image: faker.image.imageUrl()
  }
}

export function generateProducts(count = 10): IProduct[] {
  return Array.from({ length: count }, generateProduct)
}
