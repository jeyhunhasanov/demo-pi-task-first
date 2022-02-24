import {Action, Component, Getter, Provide, Vue} from 'nuxt-property-decorator'
// Models
import {ModelUser} from '~/models/user/User'
import {ModelPost, ModelPostQueryParams} from '~/models/post/Post'
// Stores
import {FETCH_USER_DETAILS, GET_USER_DETAILS} from '~/store/user/types'
import {FETCH_POSTS, GET_POSTS} from '~/store/post/types'
import {REGEX_ALLOW_NUMBERS} from '~/constants/regex'

@Component({
  validate({query}) {
    const userId = String(query.userId)
    return REGEX_ALLOW_NUMBERS.test(userId)
  }
})
class UserPostsList extends Vue {
  // region Provide

  @Provide() userId: number = 0

  // endregion

  // region Store

  @Action(FETCH_USER_DETAILS, {namespace: 'user'}) fetchUserDetails!: any
  @Getter(GET_USER_DETAILS, {namespace: 'user'}) getUserDetails!: ModelUser

  @Action(FETCH_POSTS, {namespace: 'post'}) fetchPosts!: any
  @Getter(GET_POSTS, {namespace: 'post'}) getPosts!: ModelPost[]

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

  // endregion
}

export default UserPostsList
