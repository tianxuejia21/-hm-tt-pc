import axios from 'axios'

import local from '@/utils/local'

import router from '@/router'

import Jsonbig from 'json-bigint'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

axios.defaults.transformResponse = [(data) => {
  try {
    return Jsonbig.parse(data)
  } catch (e) {
    return data
  }
}]

axios.interceptors.request.use((config) => {
  const user = local.getUser() || {}
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, (err) => {
  return Promise.reject(err)
})

axios.interceptors.response.use(res => res, err => {
  if (err.response.status === 401) {
    return router.path('/login')
  }
  return Promise.reject(err)
})
export default axios
