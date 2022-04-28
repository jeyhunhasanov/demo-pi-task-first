import {Component, Getter, Provide, Vue} from 'nuxt-property-decorator'
// Model
import {ModelPaginationOptions} from '~/models/general/General'
// Store
import {GET_PAGINATION_OPTIONS} from '~/store/paginationOptions/types'

@Component
class PaginationMixin extends Vue {
  // region Provide

  @Provide() page: number = 1

  // endregion

  // region Store

  @Getter(GET_PAGINATION_OPTIONS, {namespace: 'paginationOptions'}) getPaginationOptions!: ModelPaginationOptions

  // endregion

  // region Computed

  get paginationOptions() {
    return this.getPaginationOptions
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
}

export default PaginationMixin
