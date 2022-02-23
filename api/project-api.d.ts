import {ModelUser, ModelUserQueryParams} from '~/models/user/User'
import {ModelPost, ModelPostQueryParams} from '~/models/post/Post'

export interface API {
  // region User

  // @ts-ignore
  '/users': {
    GET: {
      params: ModelUserQueryParams
      response: {
        data: ModelUser[]
      }
    }
  }
  // @ts-ignore
  '/users/:userId': {
    GET: {
      response: {
        data: ModelUser
      }
    }
  }
  // @ts-ignore
  '/users': {
    POST: {
      body: ModelUser
      response: {
        data: ModelUser
      }
    }
  }
  // @ts-ignore
  '/users/:userId': {
    PUT: {
      body: ModelUser
      response: {
        data: ModelUser
      }
    }
  }
  // @ts-ignore
  '/users/:userId': {
    DELETE: {
      response: {
        data: boolean
      }
    }
  }

  // endregion

  // region Post

  // @ts-ignore
  '/users/:userId/posts': {
    GET: {
      params: ModelPostQueryParams
      response: {
        data: ModelPost[]
      }
    }
  }
  // @ts-ignore
  '/posts/:postId': {
    GET: {
      response: {
        data: ModelPost
      }
    }
  }
  // @ts-ignore
  '/users/:userId/posts': {
    POST: {
      body: ModelPost
      response: {
        data: ModelPost
      }
    }
  }
  // @ts-ignore
  '/posts/:postId': {
    PUT: {
      body: ModelPost
      response: {
        data: ModelPost
      }
    }
  }
  // @ts-ignore
  '/posts/:postId': {
    DELETE: {
      response: {
        data: boolean
      }
    }
  }

  // endregion
}
