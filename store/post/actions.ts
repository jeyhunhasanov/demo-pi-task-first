import {TypedAxiosResponse} from 'restyped-axios'
import {ActionContext, ActionTree} from 'vuex'

import {State} from './state'
import {
  FETCH_CREATE_POST,
  FETCH_DELETE_POST,
  FETCH_POST_DETAILS,
  FETCH_POSTS,
  FETCH_UPDATE_POST,
  SET_CREATE_POST,
  SET_DELETE_POST,
  SET_POST_DETAILS,
  SET_POSTS,
  SET_UPDATE_POST
} from './types'
import $http from '@/api/index'
import {ModelPost} from '~/models/post/Post'

export const actions: ActionTree<State, any> = {
  [FETCH_POSTS]: (context: ActionContext<State, any>, requestPayload: any) => {
    return new Promise(() => {
      $http
        .request({
          method: 'GET',
          url: `/users/${requestPayload.userId}/posts` as any,
          params: requestPayload.params
        })
        .then((response: TypedAxiosResponse<any, any, any>) => {
          const data = response.data as ModelPost[]
          context.commit(SET_POSTS, data)
        })
    })
  },
  [FETCH_POST_DETAILS]: (context: ActionContext<State, any>, postId: number) => {
    return new Promise(() => {
      $http
        .request({
          method: 'GET',
          url: `/posts/${postId}` as any
        })
        .then((response: TypedAxiosResponse<any, any, any>) => {
          const data = response.data as ModelPost
          context.commit(SET_POST_DETAILS, data)
        })
    })
  },
  [FETCH_CREATE_POST]: (context: ActionContext<State, any>, requestPayload: any) => {
    return new Promise(() => {
      $http
        .request({
          method: 'POST',
          url: `/users/${requestPayload.userId}/posts` as any,
          data: requestPayload.body
        })
        .then((response: TypedAxiosResponse<any, any, any>) => {
          const data = response.data as ModelPost
          context.commit(SET_CREATE_POST, data)
        })
    })
  },
  [FETCH_UPDATE_POST]: (context: ActionContext<State, any>, requestPayload: any) => {
    return new Promise(() => {
      $http
        .request({
          method: 'PUT',
          url: `/posts/${requestPayload.postId}` as any,
          data: requestPayload.body
        })
        .then((response: TypedAxiosResponse<any, any, any>) => {
          const data = response.data as ModelPost
          context.commit(SET_UPDATE_POST, data)
        })
    })
  },
  [FETCH_DELETE_POST]: (context: ActionContext<State, any>, postId: number) => {
    return new Promise(() => {
      $http
        .request({
          method: 'DELETE',
          url: `/posts/${postId}` as any
        })
        .then(() => {
          context.commit(SET_DELETE_POST)
        })
    })
  }
}

export default actions
