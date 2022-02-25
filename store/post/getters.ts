import {GetterTree} from 'vuex'

import {State} from './state'
import {
  GET_CREATE_POST,
  GET_DELETE_POST,
  GET_UPDATE_POST,
  GET_POST_DETAILS,
  GET_POSTS,
  GET_POSTS_PAGINATION_OPTIONS
} from './types'
import {ModelPost} from '~/models/post/Post'
import {ModelPaginationOptions} from '~/models/general/General'

export const getters: GetterTree<State, any> = {
  [GET_POSTS](state: State): ModelPost[] {
    return state.posts
  },
  [GET_POSTS_PAGINATION_OPTIONS](state: State): ModelPaginationOptions {
    return state.postsPaginationOptions
  },
  [GET_POST_DETAILS](state: State): ModelPost {
    return state.postDetails
  },
  [GET_CREATE_POST](state: State): ModelPost {
    return state.createPost
  },
  [GET_UPDATE_POST](state: State): ModelPost {
    return state.updatePost
  },
  [GET_DELETE_POST](state: State): boolean {
    return state.deletePost
  }
}

export default getters
