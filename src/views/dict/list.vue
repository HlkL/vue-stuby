<template>
    <div class="app-container">
        <h3 style="color: #6776A3">字典列表</h3>

        <div class="el-toolbar">
            <div class="el-toolbar-body" style="justify-content: flex-start;">
                <!-- 在新的标签页打开 -->
                <a href="http://localhost:8202/admin/common/dict/exportData" target="_blank">
                    <el-button type="text"><i class="fa fa-plus"/> 导出</el-button>
                </a>
                <!-- <el-button type="text" @click="exportData"><i class="fa fa-plus"/> 字典数据导出</el-button> -->
                <!-- 字典数据导入 -->
                <el-button type="text" @click="importData"><i class="fa fa-plus"/> 导入</el-button>
                <!-- 导入弹出层 -->
                <el-dialog title="导入" :visible.sync="dialogImportVisible" width="480px">
                    <el-form label-position="right" label-width="170px">

                        <el-form-item label="文件">
                            <!--onUploadSuccess 文件上传默认名称为file,可使用name指定   -->
                            <el-upload :multiple="false" name="file" :on-success="onUploadSuccess"
                                :action="'http://localhost:8202/admin/common/dict/importData'"
                                class="upload-demo">
                                <el-button size="small" plain=true type="warning">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传Excel文件，且不超过500kb</div>
                            </el-upload>
                        </el-form-item>

                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogImportVisible = false">取消</el-button>
                    </div>
                </el-dialog>

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
        list: [],
        dialogImportVisible: false
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
    },
    //打开上传弹窗
    importData(){
        this.dialogImportVisible = true
    },
    //文件上传成功
    onUploadSuccess(){
        this.dialogImportVisible = false
        //刷新页面
        this.getDictList( 1 )
        this.$message.info('上传成功')
    }

  }
}


</script>