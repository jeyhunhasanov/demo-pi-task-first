import {Action, Component, Getter, Provide, Ref, Vue, Watch} from 'nuxt-property-decorator'
// Mixins
import LoadingMixin from '~/mixins/LoadingMixin'
import ValidationsMixin from '~/mixins/ValidationsMixin'
// Models
import {ModelUser} from '~/models/user/User'
import {ModelEnumGenderType, ModelEnumStatusType} from '~/models/enum/Enum'
// Stores
import {FETCH_UPDATE_USER, FETCH_USER_DETAILS, GET_UPDATE_USER, GET_USER_DETAILS} from '~/store/user/types'
// Enums
import {EnumGenderType, EnumStatusType} from '~/enums'
// Regexes
import {REGEX_ALLOW_NUMBERS} from '~/constants/regex'

@Component({
  mixins: [LoadingMixin, ValidationsMixin],
  validate({params}) {
    return REGEX_ALLOW_NUMBERS.test(params.id)
  }
})
class UserDetails extends Vue {
  // region Refs

  @Ref('formValidationUpdate') refFormValidationUpdate!: HTMLFormElement

  // endregion

  // region Provide

  @Provide() userId: number = 0

  @Provide() enumGenderType: ModelEnumGenderType = EnumGenderType

  @Provide() enumStatusType: ModelEnumStatusType = EnumStatusType

  @Provide() requestUserDetails: ModelUser = {}

  @Provide() formValidationUpdate: boolean = false

  // endregion

  // region Store

  @Action(FETCH_USER_DETAILS, {namespace: 'user'}) fetchUserDetails!: any
  @Getter(GET_USER_DETAILS, {namespace: 'user'}) getUserDetails!: ModelUser

  @Action(FETCH_UPDATE_USER, {namespace: 'user'}) fetchUpdateUser!: any
  @Getter(GET_UPDATE_USER, {namespace: 'user'}) getUpdateUser!: ModelUser

  // endregion

  // region Function

  triggerFetchUserDetails(userId: number) {
    this.fetchUserDetails(userId)
  }

  btnUpdate() {
    if (this.refFormValidationUpdate.validate()) {
      this.fetchUpdateUser({
        userId: this.userId,
        body: this.requestUserDetails
      })
    }
  }

  // endregion

  // region Hook

  mounted() {
    this.userId = Number(this.$route.params.id)
    this.triggerFetchUserDetails(this.userId)
  }

  // endregion

  // region Watch

  @Watch('getUserDetails')
  responseUserDetails(userDetails: ModelUser) {
    this.requestUserDetails = {...userDetails}
    delete this.requestUserDetails.id
  }

  @Watch('getUpdateUser')
  responseUpdateUser() {
    this.$notifier.show({
      content: 'Yeniləndi',
      duration: 3000,
      type: 'success',
      placement: {
        right: true,
        top: true
      }
    })
  }

  // endregion
}

export default UserDetails
