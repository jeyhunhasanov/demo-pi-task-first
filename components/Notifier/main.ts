import {Component, Provide, Vue} from 'nuxt-property-decorator'

import {EventBus} from '~/utils/eventBus'

@Component
class Notifier extends Vue {
  // region Provide

  @Provide() snackbar: boolean = false

  @Provide() settings: any = {
    content: '',
    placement: {
      right: true,
      top: true
    },
    duration: 5000,
    type: 'error'
  }

  // endregion

  // region Hooks

  mounted() {
    EventBus.$on('notifier:show', (payload: any) => {
      this.snackbar = false
      setTimeout(() => {
        this.settings = payload
        this.snackbar = true
      }, 300)
    })
  }

  // endregion
}

export default Notifier
