import {TypedAxiosResponse} from 'restyped-axios'
import {ActionContext, ActionTree} from 'vuex'

import {State} from './state'
import {
  FETCH_CREATE_USER,
  FETCH_DELETE_USER,
  FETCH_UPDATE_USER,
  FETCH_USER_DETAILS,
  FETCH_USERS,
  SET_CREATE_USER,
  SET_DELETE_USER,
  SET_UPDATE_USER,
  SET_USER_DETAILS,
  SET_USERS
} from './types'
import $http from '@/api/index'
import {ModelUser, ModelUserQueryParams} from '~/models/user/User'

export const actions: ActionTree<State, any> = {
  [FETCH_USERS]: (context: ActionContext<State, any>, queryParams: ModelUserQueryParams) => {
    return new Promise(() => {
      $http
        .request({
          method: 'GET',
          url: '/users',
          params: queryParams
        })
        .then((response: TypedAxiosResponse<any, any, any>) => {
          const data = response.data as ModelUser[]
          context.commit(SET_USERS, data)
        })
    })
  },
  [FETCH_USER_DETAILS]: (context: ActionContext<State, any>, userId: number) => {
    return new Promise(() => {
      $http
        .request({
          method: 'GET',
          url: `/users/${userId}` as any
        })
        .then((response: TypedAxiosResponse<any, any, any>) => {
          const data = response.data as ModelUser
          context.commit(SET_USER_DETAILS, data)
        })
    })
  },
  [FETCH_CREATE_USER]: (context: ActionContext<State, any>, requestPayload: ModelUser) => {
    return new Promise(() => {
      $http
        .request({
          method: 'POST',
          url: `/users` as any,
          data: requestPayload
        })
        .then((response: TypedAxiosResponse<any, any, any>) => {
          const data = response.data as ModelUser
          context.commit(SET_CREATE_USER, data)
        })
    })
  },
  [FETCH_UPDATE_USER]: (context: ActionContext<State, any>, requestPayload: any) => {
    return new Promise(() => {
      $http
        .request({
          method: 'PUT',
          url: `/users/${requestPayload.userId}` as any,
          data: requestPayload.body
        })
        .then((response: TypedAxiosResponse<any, any, any>) => {
          const data = response.data as ModelUser
          context.commit(SET_UPDATE_USER, data)
        })
    })
  },
  [FETCH_DELETE_USER]: (context: ActionContext<State, any>, userId: number) => {
    return new Promise(() => {
      $http
        .request({
          method: 'DELETE',
          url: `/users/${userId}` as any
        })
        .then(() => {
          context.commit(SET_DELETE_USER)
        })
    })
  }
}

export default actions
