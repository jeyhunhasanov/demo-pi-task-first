import {GetterTree} from 'vuex'

import {State} from './state'
import {GET_PAGINATION_OPTIONS} from './types'
import {ModelPaginationOptions} from '~/models/general/General'

export const getters: GetterTree<State, any> = {
  [GET_PAGINATION_OPTIONS](state: State): ModelPaginationOptions {
    return state.paginationOptions
  }
}

export default getters
