import { IProduct, IProductToCreate, TParams } from '../../typings/product'
import boom from '@hapi/boom'
import { generateProduct, sleep } from './utils'
import sql from '../../db'

const fakeProducts: Map<string, IProduct> = new Map(
  [
    {
      id: '1ddb4d3c-4ae6-45fb-bcfb-37ca9f229d2d',
      name: 'Licensed Soft Keyboard',
      price: '310.00',
      description:
        'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
      image: 'https://loremflickr.com/640/480'
    },
    {
      id: 'de65af7e-fd7b-4275-bb74-fbedbcc0f4f8',
      name: 'Elegant Plastic Fish',
      price: '81.00',
      description:
        'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design',
      image: 'https://loremflickr.com/640/480'
    },
    {
      id: 'bf628ed2-d64e-4778-8dbc-6c6f5306e802',
      name: 'Tasty Rubber Shoes',
      price: '562.00',
      description:
        'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality',
      image: 'https://loremflickr.com/640/480'
    },
    {
      id: '9bb2fbd1-5a28-4186-ac9f-855deba93d0f',
      name: 'Sleek Soft Keyboard',
      price: '249.00',
      description:
        'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design',
      image: 'https://loremflickr.com/640/480'
    },
    {
      id: '1ae3c457-0f97-4553-a382-6dc66826dec1',
      name: 'Fantastic Bronze Keyboard',
      price: '711.00',
      description:
        'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
      image: 'https://loremflickr.com/640/480'
    },
    {
      id: '3a0bcdac-0442-4235-9487-2e0bd72cdbf4',
      name: 'Electronic Cotton Chips',
      price: '766.00',
      description:
        'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart',
      image: 'https://loremflickr.com/640/480'
    },
    {
      id: '2f7b6d44-3efa-40b7-9740-b0b44891714b',
      name: 'Bespoke Fresh Shoes',
      price: '695.00',
      description:
        'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit',
      image: 'https://loremflickr.com/640/480'
    },
    {
      id: '0f886867-be4c-4637-8718-3f77a8437c7e',
      name: 'Refined Granite Bike',
      price: '53.00',
      description:
        'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
      image: 'https://loremflickr.com/640/480'
    },
    {
      id: 'f10ded72-986e-4b18-b095-581e9abbcaa5',
      name: 'Modern Frozen Chips',
      price: '713.00',
      description:
        'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design',
      image: 'https://loremflickr.com/640/480'
    },
    {
      id: '199fbcd3-84c1-4dff-b55c-d82e0e6aef75',
      name: 'Intelligent Cotton Car',
      price: '704.00',
      description:
        'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design',
      image: 'https://loremflickr.com/640/480'
    }
  ].map((product) => [product.id, product])
)

export async function getOne(id: string): Promise<IProduct | null> {
  await sleep(100)
  const product = fakeProducts.get(id)
  if (!product) throw boom.notFound(`Product with id ${id} not found`)
  return product
}

export async function getAll(params: TParams): Promise<IProduct[]> {
  const { limit = 10, offset = 0 } = params
  const products = await sql<IProduct[]>`
    SELECT * FROM "products" LIMIT ${limit} OFFSET ${offset}
  `

  return products
}

export async function createOne(product: IProductToCreate): Promise<IProduct> {
  await sleep(100)
  const id = generateProduct().id
  const newProduct = { ...product, id, description: product.description || '' }
  fakeProducts.set(id, newProduct)
  return newProduct
}

export async function updateOne(
  id: string,
  product: Partial<IProductToCreate>
): Promise<IProduct> {
  await sleep(100)
  const productToUpdate = fakeProducts.get(id)
  if (!productToUpdate) throw boom.notFound(`Product with id ${id} not found`)
  const updatedProduct = { ...productToUpdate, ...product }
  fakeProducts.set(id, updatedProduct)
  return updatedProduct
}

export async function deleteOne(id: string): Promise<void> {
  await sleep(100)
  const productToDelete = fakeProducts.get(id)
  if (!productToDelete) throw boom.notFound(`Product with id ${id} not found`)
  fakeProducts.delete(id)
}

const services = {
  getOne,
  getAll,
  createOne,
  updateOne,
  deleteOne
}

export default services
