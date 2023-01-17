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
    }
}