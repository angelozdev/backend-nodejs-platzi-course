export interface IProduct {
  id: string
  name: string
  price: string
  description: string
  image: string
}

export interface IProductToCreate {
  name: string
  price: string
  description?: string
  image: string
}

export interface IResponse<T> {
  count: number
  data: T[]
  next: string | null
  previous: string | null
}

export type TParams = Partial<{
  offset: number
  limit: number
}>
