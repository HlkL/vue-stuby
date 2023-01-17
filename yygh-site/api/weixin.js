import request from '@/utils/request'

const weixin = `/api/ucenter/wx`

export default {
    //获取二维码登录参数
    getLoginParam(){
        return request({
            url: `${weixin}/getLoginParam`,
            method: 'get'
        })
    }
}