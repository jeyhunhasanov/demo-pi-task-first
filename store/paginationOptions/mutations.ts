import {MutationTree} from 'vuex'

import {State} from './state'
import {SET_PAGINATION_OPTIONS} from './types'
import {ModelPaginationOptions} from '~/models/general/General'

export const mutations: MutationTree<State> = {
  [SET_PAGINATION_OPTIONS]: (state: State, data: ModelPaginationOptions) => {
    state.paginationOptions = data
  }
}

export default mutations
