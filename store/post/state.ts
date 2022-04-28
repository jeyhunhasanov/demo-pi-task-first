import {ModelPost} from '~/models/post/Post'

export interface State {
  posts: ModelPost[]
  postDetails: ModelPost
  createPost: ModelPost
  updatePost: ModelPost
  deletePost: boolean
}

const state = (): State => ({
  posts: [] as ModelPost[],
  postDetails: {} as ModelPost,
  createPost: {} as ModelPost,
  updatePost: {} as ModelPost,
  deletePost: false as boolean
})

export default state
