import {MutationTree} from 'vuex'

import {State} from './state'
import {SET_CREATE_POST, SET_DELETE_POST, SET_POST_DETAILS, SET_POSTS, SET_UPDATE_POST} from './types'

import {ModelPost} from '~/models/post/Post'

export const mutations: MutationTree<State> = {
  [SET_POSTS]: (state: State, data: ModelPost[]) => {
    state.posts = data
  },
  [SET_POST_DETAILS]: (state: State, data: ModelPost) => {
    state.postDetails = data
  },
  [SET_CREATE_POST]: (state: State, data: ModelPost) => {
    state.createPost = data
  },
  [SET_UPDATE_POST]: (state: State, data: ModelPost) => {
    state.updatePost = data
  },
  [SET_DELETE_POST]: (state: State) => {
    state.deletePost = !state.deletePost
  }
}

export default mutations
