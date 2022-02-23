import Vue from 'vue'

import {EventBus} from '~/utils/eventBus'
import ColorsServices from '~/utils/colors/ColorsServices'
import LoadingService from '~/utils/loading/LoadingService'
import NotifierService from '~/utils/notifier/NotifierService'

Vue.prototype.$eventBus = EventBus
Vue.prototype.$colors = new ColorsServices()
Vue.prototype.$loadingServer = new LoadingService()
Vue.prototype.$notifier = new NotifierService()

declare module 'vue/types/vue' {
  interface Vue {
    $eventBus: Vue
    $colors: ColorsServices
    $loadingServer: LoadingService
    $notifier: NotifierService
  }
}
