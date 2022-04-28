import {ActionContext, ActionTree} from 'vuex'

import {State} from './state'
import {FETCH_PAGINATION_OPTIONS, SET_PAGINATION_OPTIONS} from './types'
import {ModelPaginationOptions} from '~/models/general/General'

export const actions: ActionTree<State, any> = {
  [FETCH_PAGINATION_OPTIONS]: (context: ActionContext<State, any>, paginationOptions: ModelPaginationOptions) => {
    context.commit(SET_PAGINATION_OPTIONS, paginationOptions)
  }
}

export default actions
