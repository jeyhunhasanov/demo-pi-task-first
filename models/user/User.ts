export interface ModelUser {
  id?: number
  name?: string | null
  email?: string
  gender?: string
  status?: string
}

export interface ModelUserQueryParams extends ModelUser {
  page?: number
}
