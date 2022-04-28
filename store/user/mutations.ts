import {MutationTree} from 'vuex'

import {State} from './state'
import {SET_CREATE_USER, SET_DELETE_USER, SET_UPDATE_USER, SET_USER_DETAILS, SET_USERS} from './types'

import {ModelUser} from '~/models/user/User'

export const mutations: MutationTree<State> = {
  [SET_USERS]: (state: State, data: ModelUser[]) => {
    state.users = data
  },
  [SET_USER_DETAILS]: (state: State, data: ModelUser) => {
    state.userDetails = data
  },
  [SET_CREATE_USER]: (state: State, data: ModelUser) => {
    state.createUser = data
  },
  [SET_UPDATE_USER]: (state: State, data: ModelUser) => {
    state.updateUser = data
  },
  [SET_DELETE_USER]: (state: State) => {
    state.deleteUser = !state.deleteUser
  }
}

export default mutations
