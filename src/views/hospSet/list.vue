<template>
  <div class="app-container">
    <h3 style="color: #6776A3">医院设置列表</h3>

    <!-- 医院设置模糊搜索 -->
    <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
            <el-input  v-model="searchObj.hosname" placeholder="医院名称"/>
        </el-form-item>
        <el-form-item>
            <el-input v-model="searchObj.hoscode" placeholder="医院编号"/>
        </el-form-item>
        <el-button type="primary" plain=true icon="el-icon-search" @click="getList()">查询</el-button>
    </el-form>

    <!-- 工具条 -->
    <div>
        <el-button type="danger" plain=true size="mini" @click="removeRows()">批量删除</el-button>
    </div>


    <!--医院设置表格 -->
    <el-table :data="list" stripe style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"/>
        <el-table-column type="index" width="50" label="序号"/>
        <el-table-column prop="hosname" label="医院名称"/>
        <el-table-column prop="hoscode" label="医院编号"/>
        <el-table-column prop="apiUrl" label="api基础路径" width="200"/>
        <el-table-column prop="contactsName" label="联系人姓名"/>
        <el-table-column prop="contactsPhone" label="联系人手机"/>
        <el-table-column label="状态" width="80">
            <template slot-scope="scope">
                    {{ scope.row.status === 1 ? '可用' : '不可用' }}
            </template>
        </el-table-column>
        <!-- 删除按钮 -->
        <el-table-column label="操作" width="280" align="center">
            <template slot-scope="scope">
                <el-button type="primary" plain=true v-if="scope.row.status==1" size="mini" @click="lockHospSet(scope.row.id,0)">禁用</el-button>
                <el-button type="success" plain=true v-if="scope.row.status==0" size="mini" @click="lockHospSet(scope.row.id,1)">启用</el-button>
                <el-button type="danger" plain=true size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
                <router-link :to="'/hospSet/edit/'+scope.row.id">
                    <el-button type="warning" plain=true size="mini" icon="el-icon-edit">修改</el-button>
                </router-link>
            </template>
        </el-table-column>
    </el-table>

    <!--分页栏  -->
    <el-pagination :current-page="current" :page-size="limit" :total="total"
     style="padding: 30px 0; text-align: center;" 
     layout="total, prev, pager, next, jumper" 
     @current-change="getList" />


  </div>
</template>

<script>
//引入依赖
import hospSet from "@/api/hospSet";

export default {
  //定义变量和初始值
  data() {
    return {
      //当前页,每页显示数据,条件封装对象
      current: 1,
      limit: 3,
      searchObj: {},
      list:[],   //每页数据集合
      total: 0,   //总页数
      multipleSelection: []     //批量选择中的记录列表
    }
  },
  //钩子函数,在页面渲染之前执行
  created() {
    //调用methods定义的方法,获取数据
    this.getList()
  },
  methods: {
    //医院设置列表
    getList( page = 1) {
        this.current = page
        hospSet.getHospSetList( this.current,this.limit,this.searchObj )
            .then( response => {        //接口返回数据
                //获取数据
                this.list = response.data.records
                this.total = response.data.total
                console.log( this.list )
            } )
            .catch( error => {          //请求失败
                console.log( error )
            } )
    },
    //删除医院设置
    removeDataById( id ){
        // alert( id )

        this.$confirm('此操作将永久删除医院是设置信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => { //确定执行then方法
            //调用接口
            hospSet.deleteHospSet(id)
            .then( response => {
                //提示
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
                //刷新页面
                this.getList(1)
            })
        })
    },
    //批量删除
    removeRows(  ){
        this.$confirm('此操作将永久删除医院是设置信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => { //确定执行then方法
            let ids = []
            //获取复选框中的id
            for( let i = 0; i < this.multipleSelection.length; i++ ){
                let obj = this.multipleSelection[i];
                let id = obj.id
                ids.push( id )
            }
            //调用接口
            hospSet.batchRemoveHospSet( ids )
            .then( response => {
                //提示
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
                //刷新页面
                this.getList( this.current )
            })
        })
    },
    //获取复选框id值
    handleSelectionChange( selection ){
        console.log( selection )
        this.multipleSelection = selection
    },
    //禁用医院设置
    lockHospSet( id,status ){
        hospSet.lockHospSet( id,status )
            .then( response  =>{
                this.getList( this.current )
            } )
            .catch( error => {
                this.$message({
                    type: 'error',
                    message: '禁用失败!'
                })
            })
    }
  }
}

</script>
