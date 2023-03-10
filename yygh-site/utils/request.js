import axios from 'axios'
import cookie from 'js-cookie'
import { MessageBox, Message } from 'element-ui'
// 创建axios实例
const service = axios.create({
    baseURL: 'http://localhost',
    timeout: 15000 // 请求超时时间
})
// http request 拦截器
service.interceptors.request.use(
    config => {
    //是否有cookie是否有token
    if( cookie.get('token') ){
        //将值放入cookie中
        config.headers['token'] = cookie.get('token')
    }
    return config
},
  err => {
    return Promise.reject(err)
})
// http response 拦截器
service.interceptors.response.use(
    response => {
        //用户没有登录
        if( response.data.code === 208 ){
            //弹出登录框
            loginEvent.$emit('loginDialogEnvet')
            return
        }else{
            if (response.data.code !== 200) {
                Message({
                    message: response.data.message,
                    type: 'error',
                    duration: 5 * 1000
                })
                return Promise.reject(response.data)
            } else {
                return response.data
            }
        }
        
    },
    error => {
        return Promise.reject(error.response)
})
export default service
