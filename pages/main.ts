import {Action, Component, Getter, Provide, Vue} from 'nuxt-property-decorator'
// Mixins
import LoadingMixin from '~/mixins/LoadingMixin'
import ValidationsMixin from '~/mixins/ValidationsMixin'
// Models
import {ModelUser, ModelUserQueryParams} from '~/models/user/User'
import {ModelEnumGenderType, ModelEnumStatusType} from '~/models/enum/Enum'
// Stores
import {FETCH_USERS, GET_USERS} from '~/store/user/types'
// Enums
import {EnumGenderType, EnumStatusType} from '~/enums'

@Component({
  mixins: [LoadingMixin, ValidationsMixin]
})
class UserList extends Vue {
  // region Provide

  @Provide() enumGenderType: ModelEnumGenderType = EnumGenderType

  @Provide() enumStatusType: ModelEnumStatusType = EnumStatusType

  // endregion

  // region Store

  @Action(FETCH_USERS, {namespace: 'user'}) fetchUsers!: any
  @Getter(GET_USERS, {namespace: 'user'}) getUsers!: ModelUser[]

  // endregion

  // region Function

  triggerFetchUsers(queryParams?: ModelUserQueryParams) {
    this.fetchUsers(queryParams)
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

  // endregion
}

export default UserList
