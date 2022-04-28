import {ModelUser} from '~/models/user/User'

export interface State {
  users: ModelUser[]
  userDetails: ModelUser
  createUser: ModelUser
  updateUser: ModelUser
  deleteUser: boolean
}

const state = (): State => ({
  users: [] as ModelUser[],
  userDetails: {} as ModelUser,
  createUser: {} as ModelUser,
  updateUser: {} as ModelUser,
  deleteUser: false as boolean
})

export default state
