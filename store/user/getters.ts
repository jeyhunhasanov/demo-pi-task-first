import {GetterTree} from 'vuex'

import {State} from './state'
import {GET_CREATE_USER, GET_DELETE_USER, GET_UPDATE_USER, GET_USER_DETAILS, GET_USERS} from './types'
import {ModelUser} from '~/models/user/User'

export const getters: GetterTree<State, any> = {
  [GET_USERS](state: State): ModelUser[] {
    return state.users
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
