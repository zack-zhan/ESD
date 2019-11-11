import axios from 'axios'
import qs from 'qs'
import { message, notification } from 'ant-design-vue'
import store from '@/store'

const service = axios.create({
  baseURL: '//192.168.0.152:8910',
  timeout: 20000
})

service.interceptors.request.use(
  config => {
    store.commit('showSpinning')
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    store.commit('hideSpinning')
    if (response.data.code === 401) {
      localStorage.removeItem('token')
      notification.open({
        message: response.data.message,
        btn: (h) => {
          return h('a-button', {
            props: {
              type: 'primary',
              size: 'small'
            },
            on: {
              click: () => notification.close(window.location.href = '/')
            }
          }, '确定')
        },
        onClose: close
      })
    }
    if (response.data.code === 200) {
      return response.data
    }
    if (response.data.code !== 200 && response.data.code !== 401) {
      message.error(response.data.message)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export const get = function (url, params) {
  const request = params ? `${url}?${qs.stringify(params)}` : url
  return new Promise((resolve, reject) => {
    service.get(request)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const post = function (url, params) {
  return new Promise((resolve, reject) => {
    service.post(url, params)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const put = function (url, params) {
  return new Promise((resolve, reject) => {
    service.put(url, params)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const del = function (url, params, body) {
  const request = `${url}?${qs.stringify(params)}`
  return new Promise((resolve, reject) => {
    service.delete(request, body)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default {
  get, post, put, del
}
