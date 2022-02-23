import {EventBus} from '../eventBus'

class LoadingService {
  enable() {
    EventBus.$emit('loading:enable')
  }

  disable() {
    EventBus.$emit('loading:disable')
  }
}

export default LoadingService
