export interface ModelPost {
  id: number
  user_id: number
  title: string
  body: string
}

export interface ModelPostQueryParams extends ModelPost {
  page?: number
}
