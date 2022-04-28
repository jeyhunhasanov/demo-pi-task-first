import restypedAxios, {TypedAxiosRequestConfig} from 'restyped-axios'

import {API} from './project-api'
import {EventBus} from '@/utils/eventBus'
import NotifierService from '@/utils/notifier/NotifierService'
import StoreServices from '@/utils/store/StoreServices'
import {ModelPaginationOptions} from '~/models/general/General'

const BASE_URL = process.env.BASE_URL

const instance = restypedAxios.create<API>({
  baseURL: BASE_URL,
  timeout: 10000
})

const $notifier = new NotifierService()
const $store = new StoreServices()

// region Interceptors

instance.interceptors.request.use(
  (config: TypedAxiosRequestConfig<any, any, any>) => {
    if (!config.headers.Accept) {
      config.headers = {Accept: 'application/json'}
    }
    if (!config.headers['Content-Type']) {
      config.headers = {'Content-Type': 'application/json'}
    }
    const accessToken = 'Bearer eaf99e36bf47f46ffb7506f27f7e81386578b59e0e249a2f8cace7bfcaa98adc'
    if (accessToken) {
      config.headers.Authorization = accessToken
    }
    EventBus.$emit('loading:enable')
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    EventBus.$emit('loading:disable')

    const headers = response.headers

    const paginationOptions: ModelPaginationOptions = {
      limit: Number(headers['x-pagination-limit']),
      page: Number(headers['x-pagination-page']),
      pages: Number(headers['x-pagination-pages']),
      total: Number(headers['x-pagination-total'])
    }

    $store.dispatch('paginationOptions/FETCH_PAGINATION_OPTIONS', paginationOptions)
    return response
  },
  (error) => {
    EventBus.$emit('loading:disable')
    const response = error.response
    const message = response.data.message

    if (message) {
      $notifier.show({
        content: message,
        duration: 3000,
        type: 'error',
        placement: {
          right: true,
          top: true
        }
      })
    }
    return Promise.reject(error)
  }
)

// endregion

export default instance
