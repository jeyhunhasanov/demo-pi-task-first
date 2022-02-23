import restypedAxios, {TypedAxiosRequestConfig} from 'restyped-axios'

import {API} from './project-api'
import {EventBus} from '@/utils/eventBus'

const BASE_URL = process.env.BASE_URL

const instance = restypedAxios.create<API>({
  baseURL: BASE_URL,
  timeout: 10000
})

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
    return response
  },
  (error) => {
    EventBus.$emit('loading:disable')
    return Promise.reject(error)
  }
)

// endregion

export default instance
