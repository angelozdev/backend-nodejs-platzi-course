import { object, string, number, define, optional, union } from 'superstruct'

const isUUID = (value: any) => {
  const uuidRegEx =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return typeof value === 'string' && uuidRegEx.test(value)
}

const isURL = (value: any) => {
  const urlRegEx = /^(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$/i
  return typeof value === 'string' && urlRegEx.test(value)
}

const isPrice = (value: any) => {
  if (typeof value === 'number') return value > 0
  const priceRegEx = /^\d+(\.\d{1,2})?$/
  return typeof value === 'string' && priceRegEx.test(value)
}

const id = define<string>('id', isUUID)
const name = string()
const description = optional(string())
const price = define<string | number>('price', isPrice)
const image = define<string>('image', isURL)

export const ProductSchema = object({
  id,
  name,
  description,
  price,
  image
})

export const CreateProductSchema = object({
  name,
  description,
  price,
  image
})

export const UpdateProductShema = object({
  name: optional(name),
  description: optional(description),
  price: optional(price),
  image: optional(image)
})

export const IdSchema = object({
  id
})
