import request from '@/utils/request'

export default {
    getDictList( id ){
        return request({
            url: `/admin/common/dict/findChildData/${id}`,
            method: 'get'
        })
    }
}