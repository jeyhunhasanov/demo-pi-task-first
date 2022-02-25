import {EventBus} from '../eventBus'

class NotifierService {
  show(payload: any) {
    EventBus.$emit('notifier:show', payload)
  }

  hide() {
    EventBus.$emit('notifier:hide')
  }
}

export default NotifierService
