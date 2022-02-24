import {Action, Component, Getter, Provide, Ref, Vue, Watch} from 'nuxt-property-decorator'
// Mixins
import LoadingMixin from '~/mixins/LoadingMixin'
import ValidationsMixin from '~/mixins/ValidationsMixin'
// Models
import {ModelUser} from '~/models/user/User'
import {ModelPost, ModelPostQueryParams} from '~/models/post/Post'
import {ModelPaginationOptions} from '~/models/general/General'
// Stores
import {FETCH_USER_DETAILS, GET_USER_DETAILS} from '~/store/user/types'
import {FETCH_POSTS, GET_POSTS, GET_POSTS_PAGINATION_OPTIONS} from '~/store/post/types'
// Regexes
import {REGEX_ALLOW_NUMBERS} from '~/constants/regex'

@Component({
  validate({query}) {
    const userId = String(query.userId)
    return REGEX_ALLOW_NUMBERS.test(userId)
  },
  mixins: [LoadingMixin, ValidationsMixin]
})
class UserPostsList extends Vue {
  // region Refs

  @Ref('formValidationFilter') refFormValidationFilter!: HTMLFormElement

  // endregion

  // region Provide

  @Provide() userId: number = 0

  @Provide() page: number = 1

  @Provide() queryParams: ModelPostQueryParams = {}

  // endregion

  // region Store

  @Action(FETCH_USER_DETAILS, {namespace: 'user'}) fetchUserDetails!: any
  @Getter(GET_USER_DETAILS, {namespace: 'user'}) getUserDetails!: ModelUser

  @Action(FETCH_POSTS, {namespace: 'post'}) fetchPosts!: any
  @Getter(GET_POSTS, {namespace: 'post'}) getPosts!: ModelPost[]
  @Getter(GET_POSTS_PAGINATION_OPTIONS, {namespace: 'post'}) getPostsPaginationOptions!: ModelPaginationOptions

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
    this.triggerFetchPosts(this.queryParams)
  }

  btnResetFilter() {
    this.refFormValidationFilter.reset()
    this.triggerFetchPosts()
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

  get paginationOptions() {
    return this.getPostsPaginationOptions
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

  get isInActiveResetFilterBtn() {
    return this.queryParams.title || this.queryParams.body
  }

  // endregion

  // region Watch

  @Watch('page')
  changePage(page: number) {
    this.queryParams.page = page
    this.triggerFetchPosts(this.queryParams)
  }

  // endregion
}

export default UserPostsList
