import {ModelUser} from '~/models/user/User'
import {ModelPaginationOptions} from '~/models/general/General'

export interface State {
  users: ModelUser[]
  usersPaginationOptions: ModelPaginationOptions
  userDetails: ModelUser
  createUser: ModelUser
  updateUser: ModelUser
  deleteUser: boolean
}

const state = (): State => ({
  users: [] as ModelUser[],
  usersPaginationOptions: {} as ModelPaginationOptions,
  userDetails: {} as ModelUser,
  createUser: {} as ModelUser,
  updateUser: {} as ModelUser,
  deleteUser: false as boolean
})

export default state
