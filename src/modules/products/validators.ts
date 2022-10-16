import { object, string, number, define, optional, union } from 'superstruct'

const isURL = (value: any) => {
  const urlRegEx = /^(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$/i
  return typeof value === 'string' && urlRegEx.test(value)
}

const isNumberString = (value: any) => {
  if (typeof value === 'number') return true
  if (typeof value === 'string') return !isNaN(+value)
  return false
}

const id = define('id', isNumberString)
const name = string()
const description = optional(string())
const price = define('price', isNumberString)
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
