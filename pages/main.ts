import {Action, Component, Getter, Provide, Ref, Watch} from 'nuxt-property-decorator'
// Mixins
import LoadingMixin from '~/mixins/LoadingMixin'
import ValidationsMixin from '~/mixins/ValidationsMixin'
// Models
import {ModelUser, ModelUserQueryParams} from '~/models/user/User'
import {ModelEnumGenderType, ModelEnumStatusType} from '~/models/enum/Enum'
// Stores
import {
  FETCH_CREATE_USER,
  FETCH_DELETE_USER,
  FETCH_USERS,
  GET_CREATE_USER,
  GET_DELETE_USER,
  GET_USERS
} from '~/store/user/types'
// Enums
import {EnumGenderType, EnumStatusType} from '~/enums'
import PaginationMixin from '~/mixins/PaginationMixin'

@Component({
  mixins: [LoadingMixin, ValidationsMixin]
})
class UserList extends PaginationMixin {
  // region Refs

  @Ref('formValidationFilter') refFormValidationFilter!: HTMLFormElement

  @Ref('formValidationCreateUser') refFormValidationCreateUser!: HTMLFormElement

  // endregion

  // region Provide

  @Provide() enumGenderType: ModelEnumGenderType = EnumGenderType

  @Provide() enumStatusType: ModelEnumStatusType = EnumStatusType

  @Provide() queryParams: ModelUserQueryParams = {}

  @Provide() dialog: any = {
    createUser: false,
    deleteUser: false
  }

  @Provide() formValidationCreateUser: boolean = false

  @Provide() requestCreateUser: ModelUser = {}

  @Provide() selectedUser: ModelUser = {}

  // endregion

  // region Store

  @Action(FETCH_USERS, {namespace: 'user'}) fetchUsers!: any
  @Getter(GET_USERS, {namespace: 'user'}) getUsers!: ModelUser[]

  @Action(FETCH_CREATE_USER, {namespace: 'user'}) fetchCreateUser!: any
  @Getter(GET_CREATE_USER, {namespace: 'user'}) getCreateUser!: ModelUser

  @Action(FETCH_DELETE_USER, {namespace: 'user'}) fetchDeleteUser!: any
  @Getter(GET_DELETE_USER, {namespace: 'user'}) getDeleteUser!: boolean

  // endregion

  // region Function

  triggerFetchUsers(queryParams?: ModelUserQueryParams) {
    this.fetchUsers(queryParams)
  }

  btnFilter() {
    this.page = 1
    this.queryParams.page = this.page
    this.triggerFetchUsers(this.queryParams)
  }

  btnResetFilter() {
    this.refFormValidationFilter.reset()
    this.triggerFetchUsers()
  }

  changePage(page: number) {
    this.queryParams.page = page
    this.triggerFetchUsers(this.queryParams)
  }

  btnCreateUser() {
    if (this.refFormValidationCreateUser.validate()) {
      this.fetchCreateUser(this.requestCreateUser)
    }
  }

  btnDeletingUser(userItem: ModelUser) {
    this.dialog.deleteUser = true
    this.selectedUser = {...userItem}
  }

  btnDeleteUser() {
    this.fetchDeleteUser(this.selectedUser.id)
  }

  // endregion

  // region Hook

  mounted() {
    this.triggerFetchUsers()
  }

  // endregion

  // region Computed

  get users(): ModelUser[] {
    return this.getUsers as ModelUser[]
  }

  get isActiveResetFilterBtn() {
    return this.queryParams.name || this.queryParams.email || this.queryParams.gender || this.queryParams.status
  }

  // endregion

  // region Watch

  @Watch('getCreateUser')
  responseCreateUser() {
    this.triggerFetchUsers(this.queryParams)
    this.refFormValidationCreateUser.reset()
    this.$notifier.show({
      content: 'Yeni istifad????i ??lav?? edildi',
      duration: 3000,
      type: 'success',
      placement: {
        right: true,
        top: true
      }
    })
    this.dialog.createUser = false
  }

  @Watch('getDeleteUser')
  responseDeleteUser() {
    this.triggerFetchUsers(this.queryParams)
    this.$notifier.show({
      content: `"${this.selectedUser.name}" adl?? istifad????i silindi.`,
      duration: 3000,
      type: 'success',
      placement: {
        right: true,
        top: true
      }
    })
    this.dialog.deleteUser = false
  }

  // endregion
}

export default UserList
