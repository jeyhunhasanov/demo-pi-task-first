import {Action, Component, Getter, Provide, Ref, Vue, Watch} from 'nuxt-property-decorator'
// Mixins
import LoadingMixin from '~/mixins/LoadingMixin'
import ValidationsMixin from '~/mixins/ValidationsMixin'
// Models
import {ModelUser, ModelUserQueryParams} from '~/models/user/User'
import {ModelEnumGenderType, ModelEnumStatusType} from '~/models/enum/Enum'
import {ModelPaginationOptions} from '~/models/general/General'
// Stores
import {
  FETCH_CREATE_USER,
  FETCH_USERS,
  GET_CREATE_USER,
  GET_USERS,
  GET_USERS_PAGINATION_OPTIONS
} from '~/store/user/types'
// Enums
import {EnumGenderType, EnumStatusType} from '~/enums'

@Component({
  mixins: [LoadingMixin, ValidationsMixin]
})
class UserList extends Vue {
  // region Refs

  @Ref('formValidationFilter') refFormValidationFilter!: HTMLFormElement

  @Ref('formValidationCreateUser') refFormValidationCreateUser!: HTMLFormElement

  // endregion

  // region Provide

  @Provide() enumGenderType: ModelEnumGenderType = EnumGenderType

  @Provide() enumStatusType: ModelEnumStatusType = EnumStatusType

  @Provide() page: number = 1

  @Provide() queryParams: ModelUserQueryParams = {}

  @Provide() dialog: any = {
    createUser: false
  }

  @Provide() formValidationCreateUser: boolean = false

  @Provide() requestCreateUser: ModelUser = {}

  // endregion

  // region Store

  @Action(FETCH_USERS, {namespace: 'user'}) fetchUsers!: any
  @Getter(GET_USERS, {namespace: 'user'}) getUsers!: ModelUser[]
  @Getter(GET_USERS_PAGINATION_OPTIONS, {namespace: 'user'}) getUsersPaginationOptions!: ModelPaginationOptions

  @Action(FETCH_CREATE_USER, {namespace: 'user'}) fetchCreateUser!: any
  @Getter(GET_CREATE_USER, {namespace: 'user'}) getCreateUser!: ModelUser

  // endregion

  // region Function

  triggerFetchUsers(queryParams?: ModelUserQueryParams) {
    this.fetchUsers(queryParams)
  }

  btnFilter() {
    this.triggerFetchUsers(this.queryParams)
  }

  btnResetFilter() {
    this.refFormValidationFilter.reset()
    this.triggerFetchUsers()
  }

  btnCreateUser() {
    if (this.refFormValidationCreateUser.validate()) {
      this.fetchCreateUser(this.requestCreateUser)
    }
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

  get paginationOptions() {
    return this.getUsersPaginationOptions
  }

  get paginationPages() {
    return this.paginationOptions.pages
  }

  get paginationLimit() {
    return this.paginationOptions.limit
  }

  get paginationTotal() {
    return this.paginationOptions.total
  }

  get paginationPagesNumbers() {
    const numbers = []
    for (let index = 1; index <= this.paginationPages; index++) {
      numbers.push(index)
    }
    return numbers
  }

  // endregion

  // region Watch

  @Watch('page')
  changePage(page: number) {
    this.queryParams.page = page
    this.triggerFetchUsers(this.queryParams)
  }

  @Watch('getCreateUser')
  responseCreateUser() {
    this.triggerFetchUsers(this.queryParams)
    this.refFormValidationCreateUser.reset()
    this.$notifier.show({
      content: 'Yeni istifadəçi əlavə edildi',
      duration: 3000,
      type: 'success',
      placement: {
        right: true,
        top: true
      }
    })
    this.dialog.createUser = false
  }

  // endregion
}

export default UserList
