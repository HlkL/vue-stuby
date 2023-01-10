<template>
  <div class="app-container">
    <h3 style="color: #6776A3">添加医院设置</h3>

    <!-- 添加医院设置表单 -->
    <el-form label-width="120px">
         <el-form-item label="医院名称">
            <el-input v-model="hospitalSet.hosname"/>
         </el-form-item>
         <el-form-item label="医院编号">
            <el-input v-model="hospitalSet.hoscode"/>
         </el-form-item>
         <el-form-item label="api基础路径">
            <el-input v-model="hospitalSet.apiUrl"/>
         </el-form-item>
         <el-form-item label="联系人姓名">
            <el-input v-model="hospitalSet.contactsName"/>
         </el-form-item>
         <el-form-item label="联系人手机">
            <el-input v-model="hospitalSet.contactsPhone"/>
         </el-form-item>
         <el-form-item>
            <el-button plain=true type="primary" @click="saveOrUpdate()">保存</el-button>
         </el-form-item>
    </el-form>


  </div>
</template>

<script>
//引入依赖
import hospSet from "@/api/hospSet";

export default {
  //定义变量和初始值
  data() {
    return {
        hospitalSet: {}
    }
  },
  created() {
    //获取路由id,回显数据
    if( this.$route.params.id ){
        //$router对象是全局路由的实例， $route对象表示当前的路由信息
        const id = this.$route.params.id
        this.getHospSet( id )
    }else{
        this.hospitalSet = {}
    }

  },
  methods: {
    getHospSet( id ){
        //获取路由中的id
        hospSet.getHospSet( id )
        .then( response =>{
            this.hospitalSet = response.data
        } )
    },
    saveHospSet(){
        hospSet.saveHospSet( this.hospitalSet )
            .then( response => {
                //跳转列表页面，使用路由跳转方式实现
                this.$router.push({path:'/hospSet/list'})
                this.$message({
                    type: 'success',
                    message: '添加成功!'
                })
            } )
    },
    updateHospSet( hospitalSet ){
        hospSet.updateHospSet( hospitalSet )
            .then( response => {
                //跳转列表页面，使用路由跳转方式实现
                this.$router.push({path:'/hospSet/list'})
                this.$message({
                    type: 'success',
                    message: '修改成功!'
                })
            } )
    },
    saveOrUpdate(){
        if( this.$route.params.id ){
            this.updateHospSet( this.hospitalSet )
        }else{
            this.saveHospSet( this.hospitalSet )
        }
    }
  }
}


</script>