import {ModelPost} from '~/models/post/Post'
import {ModelPaginationOptions} from '~/models/general/General'

export interface State {
  posts: ModelPost[]
  postsPaginationOptions: ModelPaginationOptions
  postDetails: ModelPost
  createPost: ModelPost
  updatePost: ModelPost
  deletePost: boolean
}

const state = (): State => ({
  posts: [] as ModelPost[],
  postsPaginationOptions: {} as ModelPaginationOptions,
  postDetails: {} as ModelPost,
  createPost: {} as ModelPost,
  updatePost: {} as ModelPost,
  deletePost: false as boolean
})

export default state
