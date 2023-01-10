import request from '@/utils/request'

export default {
    //分页显示医院设置列表
    getHospSetList(current,limit,searchObj){
        return request({
            url: `/admin/hosp/hospitalSet/findPageHospSet/${current}/${limit}`,
            method: 'post',
            data: searchObj     //使用json
        })
    },
    //删除医院设置
    deleteHospSet( id ) {
        return request ({
            url: `/admin/hosp/hospitalSet/${id}`,
            method: 'delete'
        })
    },
    //批量删除
    batchRemoveHospSet( idList ){
        return request({
            url: `/admin/hosp/hospitalSet/batchRemoveHospSet`,
            method: 'delete',
            data: idList     //使用json
        })
    },
    //禁用设置
    lockHospSet( id,status ){
        return request({
            url: `/admin/hosp/hospitalSet//lockHospSet/${id}/${status}`,
            method: 'put'
        })
    },
    //添加医院设置
    saveHospSet( hospitalSet ){
        return request({
            url: `/admin/hosp/hospitalSet/saveHospSet`,
            method: 'post',
            data: hospitalSet     //使用json
        })
    },
    //获取医院设置,进行数据回显
    getHospSet( id ){
        return request({
            url: `/admin/hosp/hospitalSet/fingHospSet/${id}`,
            method: 'get'
        })
    },
    //修改医院设置
    updateHospSet( hospitalSet ){
        return request({
            url: `/admin/hosp/hospitalSet/updateHospSet`,
            method: 'put',
            data: hospitalSet
        })
    }
}
