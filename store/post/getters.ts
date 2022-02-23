import {GetterTree} from 'vuex'

import {State} from './state'
import {GET_CREATE_POST, GET_DELETE_POST, GET_UPDATE_POST, GET_POST_DETAILS, GET_POSTS} from './types'
import {ModelPost} from '~/models/post/Post'

export const getters: GetterTree<State, any> = {
  [GET_POSTS](state: State): ModelPost[] {
    return state.posts
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
