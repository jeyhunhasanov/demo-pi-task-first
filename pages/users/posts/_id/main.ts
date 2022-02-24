import {Action, Component, Getter, Provide, Ref, Vue, Watch} from 'nuxt-property-decorator'
// Mixins
import LoadingMixin from '~/mixins/LoadingMixin'
import ValidationsMixin from '~/mixins/ValidationsMixin'
// Models
import {ModelPost} from '~/models/post/Post'
// Stores
import {FETCH_POST_DETAILS, FETCH_UPDATE_POST, GET_POST_DETAILS, GET_UPDATE_POST} from '~/store/post/types'
// Regexes
import {REGEX_ALLOW_NUMBERS} from '~/constants/regex'

@Component({
  mixins: [LoadingMixin, ValidationsMixin],
  validate({params}) {
    return REGEX_ALLOW_NUMBERS.test(params.id)
  }
})
class UserUpdatePost extends Vue {
  // region Refs

  @Ref('formValidationUpdatePost') refFormValidationUpdatePost!: HTMLFormElement

  // endregion

  // region Provide

  @Provide() postId: number = 0

  @Provide() requestUpdatePost: ModelPost = {
    title: '',
    body: ''
  }

  @Provide() formValidationUpdatePost: boolean = false

  // endregion

  // region Store

  @Action(FETCH_POST_DETAILS, {namespace: 'post'}) fetchPostDetails!: any
  @Getter(GET_POST_DETAILS, {namespace: 'post'}) getPostDetails!: ModelPost

  @Action(FETCH_UPDATE_POST, {namespace: 'post'}) fetchUpdatePost!: any
  @Getter(GET_UPDATE_POST, {namespace: 'post'}) getUpdatePost!: ModelPost

  // endregion

  // region Function

  triggerFetchPostDetails(userId: number) {
    this.fetchPostDetails(userId)
  }

  btnUpdatePost() {
    if (this.refFormValidationUpdatePost.validate()) {
      this.fetchUpdatePost({
        postId: this.postId,
        body: this.requestUpdatePost
      })
    }
  }

  // endregion

  // region Hook

  mounted() {
    this.postId = Number(this.$route.params.id)
    this.triggerFetchPostDetails(this.postId)
  }

  // endregion

  // region Watch

  @Watch('getPostDetails')
  responsePostDetails(postDetails: ModelPost) {
    this.requestUpdatePost.title = postDetails.title
    this.requestUpdatePost.body = postDetails.body
  }

  @Watch('getUpdatePost')
  responseUpdatePost() {
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

export default UserUpdatePost
