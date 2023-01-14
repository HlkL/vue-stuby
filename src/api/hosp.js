import request from '@/utils/request'

export default {
    //分页查询医院信息
    getPageList( page,limit,searchObj ){
        return request({
            url: `/admin/hosp/hospital/${page}/${limit}`,
            method: 'get',
            params: searchObj
        })
    },
    //获取所有省名称
    findByDictCode( dictCode ){
        return request({
            url: `/admin/common/dict/findNode/${dictCode}`,
            method: 'get'
        })
    },
    //根据id查询子数据列表
    findChildId( id ){
        return request({
            url: `/admin/common/dict/findChildData/${id}`,
            method: 'get'
        })
    },
    //更新医院状态
    updateHospStatus( id,status ){
        return request({
            url: `/admin/hosp/hospital/updateStatus/${id}/${status}`,
            method: 'put'
        })
    },
    //医院详情
    showHospById( id ){
        return request({
            url: `/admin/hosp/hospital/showHospById/${id}`,
            method: 'get'
        })
    },
    //医院科室信息tree型结构
    queryAllDeptByHospCode( hoscode ){
        return request({
            url: `/admin/hosp/department/queryAll/${hoscode}`,
            method: 'get'
        })
    }
}