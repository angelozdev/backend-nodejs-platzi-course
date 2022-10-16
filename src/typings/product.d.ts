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
