export interface PaginationInput {
  readonly page: number
  readonly limit: number
}

export interface Pagination {
  page: number
  limit: number
  total: number
}
