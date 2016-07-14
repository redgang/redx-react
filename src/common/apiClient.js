import axios from 'axios'
import {message} from 'antd'
import store from 'store2'

// https://github.com/mzabriskie/axios#creating-an-instance
const axiosOptions = {
  timeout: 8000,
  params: {
    // access_token: 'eb97d2e8cf0821814ebc731796440bc629b1f0bd'
  }
}

if (__DEV__) {
  axiosOptions.baseURL = '/api'
}

const instance = axios.create(axiosOptions)

instance.interceptors.request.use(function (config) {
  if (typeof config.data === 'string') {
    config.data = JSON.parse(config.data)
    for (let item in config.data) {
      let prop = config.data[item]
      if (prop === null || prop === 'undefined') {
        console.warn(`REQUEST => 删除参数：${item}:${prop}`)
        delete config.data[item]
      }
    }
    config.data = JSON.stringify(config.data)
  }
  return config
}, function (error) {
  console.error('XHR REQUEST ERROR :', error)
  return error
})

instance.interceptors.response.use(function (res) {
  console.log(res.data)
  return res.data
}, function (error) {
  console.error('XHR RESPONSE ERROR :', error)
  return error.data
})

export default instance
