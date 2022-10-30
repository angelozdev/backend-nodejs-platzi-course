import { faker } from '@faker-js/faker'
import { Category, Product, Role, User } from '.prisma/client'
import bcrypt from 'bcrypt'
import prisma from '../src/libs/prisma-client'

async function seedProducts(
  count = 10,
  { categories }: { categories: Category[] }
) {
  const products: Omit<Product, 'id'>[] = new Array(count)

  for (let i = 0; i < count; i++) {
    const product: Omit<Product, 'id'> = {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: +faker.commerce.price(),
      image: faker.image.imageUrl(),
      createdAt: faker.date.past(),
      updatedAt: new Date(),
      categoryId: faker.helpers.arrayElement(categories).id
    }

    products[i] = product
  }

  const createdProducts = await prisma.product.createMany({
    data: products
  })

  return createdProducts
}

async function seedRoles() {
  await prisma.role.createMany({
    data: [
      {
        name: 'admin'
      },
      {
        name: 'user'
      }
    ]
  })

  return prisma.role.findMany()
}

async function seedUsers(count = 10, { roles }: { roles: Role[] }) {
  const users: Omit<User, 'id'>[] = new Array(count)

  for await (let i of Array(count).keys()) {
    const user: Omit<User, 'id'> = {
      email: faker.internet.email(),
      password: await bcrypt.hash('Admin.1234', 10),
      name: faker.name.fullName(),
      createdAt: faker.date.past(),
      updatedAt: new Date(),
      roleId: faker.helpers.arrayElement(roles).id
    }

    users[i] = user
  }

  const createdUsers = await prisma.user.createMany({ data: users })
  return createdUsers
}

async function seedCategories(count = 5) {
  const categories: Omit<Category, 'id'>[] = new Array(count)

  for (let i = 0; i < count; i++) {
    const category: Omit<Category, 'id'> = {
      name: faker.commerce.productAdjective(),
      createdAt: faker.date.past(),
      updatedAt: new Date()
    }

    categories[i] = category
  }

  const createdCategories = await prisma.category.createMany({
    data: categories
  })

  return prisma.category.findMany()
}

async function main() {
  const createdRoles = await seedRoles()
  await seedUsers(10, { roles: createdRoles })
  const createdCategories = await seedCategories()
  await seedProducts(10, {
    categories: createdCategories
  })
}

main()
