import {ModelPaginationOptions} from '~/models/general/General'

export interface State {
  paginationOptions: ModelPaginationOptions
}

const state = (): State => ({
  paginationOptions: {} as ModelPaginationOptions
})

export default state
