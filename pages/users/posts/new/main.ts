import {Action, Component, Getter, Provide, Ref, Vue, Watch} from 'nuxt-property-decorator'
// Mixins
import LoadingMixin from '~/mixins/LoadingMixin'
import ValidationsMixin from '~/mixins/ValidationsMixin'
// Models
import {ModelPost} from '~/models/post/Post'
import {ModelUser} from '~/models/user/User'
// Stores
import {FETCH_CREATE_POST, GET_CREATE_POST} from '~/store/post/types'
import {FETCH_USER_DETAILS, GET_USER_DETAILS} from '~/store/user/types'
// Regexes
import {REGEX_ALLOW_NUMBERS} from '~/constants/regex'

@Component({
  validate({query}) {
    const userId = String(query.userId)
    return REGEX_ALLOW_NUMBERS.test(userId)
  },
  mixins: [LoadingMixin, ValidationsMixin]
})
class UserCreatePost extends Vue {
  // region Refs

  @Ref('formValidationCreatePost') refFormValidationCreatePost!: HTMLFormElement

  // endregion

  // region Provide

  @Provide() userId: number = 0

  @Provide() requestCreatePost: ModelPost = {}

  @Provide() formValidationCreatePost: boolean = false

  // endregion

  // region Store

  @Action(FETCH_USER_DETAILS, {namespace: 'user'}) fetchUserDetails!: any
  @Getter(GET_USER_DETAILS, {namespace: 'user'}) getUserDetails!: ModelUser

  @Action(FETCH_CREATE_POST, {namespace: 'post'}) fetchCreatePost!: any
  @Getter(GET_CREATE_POST, {namespace: 'post'}) getCreatePost!: ModelPost

  // endregion

  // region Function

  triggerFetchUserDetails(userId: number) {
    this.fetchUserDetails(userId)
  }

  btnCreatePost() {
    if (this.refFormValidationCreatePost.validate()) {
      this.fetchCreatePost({
        userId: this.userId,
        body: this.requestCreatePost
      })
    }
  }

  // endregion

  // region Hook

  mounted() {
    this.userId = Number(this.$route.query.userId)
    this.triggerFetchUserDetails(this.userId)
  }

  // endregion

  // region Computed

  get userDetails(): ModelUser {
    return this.getUserDetails as ModelUser
  }

  // endregion

  // region Watch

  @Watch('getCreatePost')
  responseCreatePost() {
    this.refFormValidationCreatePost.reset()
    this.$notifier.show({
      content: 'Əlavə edildi',
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

export default UserCreatePost
