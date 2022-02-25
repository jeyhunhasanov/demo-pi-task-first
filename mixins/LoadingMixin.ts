import {Component, Vue, Provide} from 'nuxt-property-decorator'
import {EventBus} from '~/utils/eventBus'

@Component
class LoadingMixin extends Vue {
  // region Provide

  @Provide() isLoading = false

  // endregion

  // region Hooks

  mounted() {
    EventBus.$on('loading:enable', () => {
      this.sendingRequest = true
    })

    EventBus.$on('loading:disable', () => {
      this.sendingRequest = false
    })
  }

  // endregion

  // region Computed

  get sendingRequest() {
    return this.isLoading
  }

  set sendingRequest(value: boolean) {
    this.isLoading = value
  }

  // endregion
}

export default LoadingMixin
