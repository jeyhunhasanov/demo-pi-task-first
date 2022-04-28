import {Action, Component, Getter, Provide, Ref, Watch} from 'nuxt-property-decorator'
// Mixins
import LoadingMixin from '~/mixins/LoadingMixin'
import ValidationsMixin from '~/mixins/ValidationsMixin'
import PaginationMixin from '~/mixins/PaginationMixin'
// Models
import {ModelUser} from '~/models/user/User'
import {ModelPost, ModelPostQueryParams} from '~/models/post/Post'
// Stores
import {FETCH_USER_DETAILS, GET_USER_DETAILS} from '~/store/user/types'
import {FETCH_DELETE_POST, FETCH_POSTS, GET_DELETE_POST, GET_POSTS} from '~/store/post/types'
// Regexes
import {REGEX_ALLOW_NUMBERS} from '~/constants/regex'

@Component({
  validate({query}) {
    const userId = String(query.userId)
    return REGEX_ALLOW_NUMBERS.test(userId)
  },
  mixins: [LoadingMixin, ValidationsMixin]
})
class UserPostsList extends PaginationMixin {
  // region Refs

  @Ref('formValidationFilter') refFormValidationFilter!: HTMLFormElement

  // endregion

  // region Provide

  @Provide() userId: number = 0

  @Provide() queryParams: ModelPostQueryParams = {}

  @Provide() dialog: any = {
    deletePost: false
  }

  @Provide() selectedPost: ModelPost = {}

  // endregion

  // region Store

  @Action(FETCH_USER_DETAILS, {namespace: 'user'}) fetchUserDetails!: any
  @Getter(GET_USER_DETAILS, {namespace: 'user'}) getUserDetails!: ModelUser

  @Action(FETCH_POSTS, {namespace: 'post'}) fetchPosts!: any
  @Getter(GET_POSTS, {namespace: 'post'}) getPosts!: ModelPost[]

  @Action(FETCH_DELETE_POST, {namespace: 'post'}) fetchDeletePost!: any
  @Getter(GET_DELETE_POST, {namespace: 'post'}) getDeletePost!: boolean

  // endregion

  // region Function

  triggerFetchPosts(queryParams?: ModelPostQueryParams) {
    this.fetchPosts({
      userId: this.userId,
      params: queryParams
    })
  }

  triggerFetchUserDetails(userId: number) {
    this.fetchUserDetails(userId)
  }

  btnFilter() {
    this.page = 1
    this.queryParams.page = this.page
    this.triggerFetchPosts(this.queryParams)
  }

  btnResetFilter() {
    this.refFormValidationFilter.reset()
    this.triggerFetchPosts()
  }

  changePage(page: number) {
    this.queryParams.page = page
    this.triggerFetchPosts(this.queryParams)
  }

  btnDeletingPost(postItem: ModelPost) {
    this.dialog.deletePost = true
    this.selectedPost = {...postItem}
  }

  btnDeletePost() {
    this.fetchDeletePost(this.selectedPost.id)
  }

  // endregion

  // region Hook

  mounted() {
    this.userId = Number(this.$route.query.userId)
    this.triggerFetchUserDetails(this.userId)
    this.triggerFetchPosts()
  }

  // endregion

  // region Computed

  get userDetails(): ModelUser {
    return this.getUserDetails as ModelUser
  }

  get posts(): ModelPost[] {
    return this.getPosts as ModelPost[]
  }

  get isActiveResetFilterBtn() {
    return this.queryParams.title || this.queryParams.body
  }

  // endregion

  // region Watch

  @Watch('getDeletePost')
  responseDeletePost() {
    this.triggerFetchPosts(this.queryParams)
    this.$notifier.show({
      content: 'Məqalə silindi.',
      duration: 3000,
      type: 'success',
      placement: {
        right: true,
        top: true
      }
    })
    this.dialog.deletePost = false
  }

  // endregion
}

export default UserPostsList
