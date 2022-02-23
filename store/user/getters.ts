import {GetterTree} from 'vuex'

import {State} from './state'
import {
  GET_CREATE_USER,
  GET_DELETE_USER,
  GET_UPDATE_USER,
  GET_USER_DETAILS,
  GET_USERS,
  GET_USERS_PAGINATION_OPTIONS
} from './types'
import {ModelUser} from '~/models/user/User'
import {ModelPaginationOptions} from '~/models/general/General'

export const getters: GetterTree<State, any> = {
  [GET_USERS](state: State): ModelUser[] {
    return state.users
  },
  [GET_USERS_PAGINATION_OPTIONS](state: State): ModelPaginationOptions {
    return state.usersPaginationOptions
  },
  [GET_USER_DETAILS](state: State): ModelUser {
    return state.userDetails
  },
  [GET_CREATE_USER](state: State): ModelUser {
    return state.createUser
  },
  [GET_UPDATE_USER](state: State): ModelUser {
    return state.updateUser
  },
  [GET_DELETE_USER](state: State): boolean {
    return state.deleteUser
  }
}

export default getters
