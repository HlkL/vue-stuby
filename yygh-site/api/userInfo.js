import request from '@/utils/request'

const user = `/api/user`

export default {
    //用户登录
    login( login ){
        return request({
            url: `${user}/login`,
            method: 'post',
            data: login
        })
    },
    //发送验证码
    sendCode( email ){
        return request({
            url: `${user}/sendCode/${email}`,
            method: 'get'
        })
    },
    //用户认证
    saveUserAuth(userAuah) {
        return request({
          url: `${user}/auth/userAuth`,
          method: 'post',
          data: userAuah
        })
    },
    //根据userId获取用户信息
    getUserInfo() {
        return request({
          url: `${user}/auth/getUserInfo`,
          method: 'get'
        })
    },
      
}