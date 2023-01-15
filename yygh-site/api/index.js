import request from '@/utils/request'

const userPath = `/api/hosp/index`
const dictPath = `/admin/common/dict`

export default {
    //获取医院列表
    getHospList( page,limit,searchObj ){
        return request({
            url: `${userPath}/${page}/${limit}`,
            method: 'get',
            params: searchObj
        })
    },
    //获取医院名称
    getHospName( hosname ){
        return request({
            url: `${userPath}/${hosname}`,
            method: 'get'
        })
    },
    //根据dict_code查询其子节点
    queryChlidNodeByDictCode( dictCode ){
        return request({
            url: `${dictPath}/findNode/${dictCode}`,
            method: 'get'
        })
    },
    //根据id查询子字段数据
    findChildData( id ){
        return request({
            url: `${dictPath}/findChildData/${id}`,
            method: 'get'
        })
    },
    //获取科室列表
    getDepartmentListByHospCode( hoscode ){
        return request({
            url: `${userPath}/getDepartmentList/${hoscode}`,
            method: 'get'
        })
    },
    //获取医院预约挂号详情
    getHospDetailsByHospCode( hoscode ){
        return request({
            url: `${userPath}/getHospDetails/${hoscode}`,
            method: 'get'
        })
    }

}