import request from '@/utils/request'

const user = `/admin/user`

export default {
    //获取医院列表
    login( login ){
        return request({
            url: `${user}/${login}`,
            method: 'post',
            data: login
        })
    },
}