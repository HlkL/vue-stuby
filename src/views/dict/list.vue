<template>
    <div class="app-container">
        <h3 style="color: #6776A3">字典列表</h3>

        <div class="el-toolbar">
            <div class="el-toolbar-body" style="justify-content: flex-start;">
                <el-button type="text" @click="exportData"><i class="fa fa-plus"/> 字典数据导出</el-button>
            </div>
        </div>


        <el-table :data="list" style="width: 100%" row-key="id" border lazy :load="getChildrens"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column label="名称" width="230" align="left">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>

            <el-table-column label="编码" width="220">
                <template slot-scope="{row}">
                        {{ row.dictCode }}
                </template>
            </el-table-column>
                <el-table-column label="值" width="230" align="left">
                <template slot-scope="scope">
                    <span>{{ scope.row.value }}</span>
                </template>
            </el-table-column>
                <el-table-column label="创建时间" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
//引入依赖
import dict from "@/api/dict";

export default {
  //定义变量和初始值
  data() {
    return {
        list: []
    }
  },
  created() {
    this.getDictList( 1 )

  },
  methods: {
    getDictList( id ){
        dict.getDictList( id ).then( response => {
            this.list = response.data
        } )
    },
    getChildrens(tree, treeNode, resolve) {
        dict.getDictList(tree.id).then(response => {
            resolve(response.data)
        })
    },
    exportData(){
        //调用导入接口
        window.location.href="http://localhost:8202/admin/common/dict/exportData"
    }

  }
}


</script>