<template>
  <div>
    <!--  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的机房</el-breadcrumb-item>
      <el-breadcrumb-item>机房号</el-breadcrumb-item>
    </el-breadcrumb>
    <!--  -->
    <el-card>  
      <!--  -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search" ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加机器</el-button>
        </el-col>
      </el-row>
      <!--  -->
      <el-table :data="tableData" border stripe>
      <el-table-column prop="date" label="机号" width="150"></el-table-column>
      <el-table-column prop="name" label="位置坐标" width="150"></el-table-column>
      <el-table-column label="机器状态" prop="pay_status" width="150">
          <template slot-scope="props">
            <el-tag v-if="props.row.pay_status == '1'" type="success">正常</el-tag>
            <el-tag v-else type="danger">故障</el-tag>
          </template>
        </el-table-column>
      <el-table-column label="是否启用" width="150">
          <template v-slot="scope">
            <!-- scope.row  能接收到这一行的数据 -->
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"> </el-switch>
          </template>
      </el-table-column>
      <el-table-column prop="time" label="最近开机时间"></el-table-column>
      <el-table-column label="操作" width="140px">
          <template v-slot="scope">
            <!-- 修改按钮 -->
            <el-button size="mini" round type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.id)"></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip effect="dark" content="分配角色" :enterable="false" placement="top">
              <el-button size="mini" round type="warning" icon="el-icon-setting" @click="setRole(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>  
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
    name:'cr',
    data(){
      return{
        queryInfo:{
        query:'',
        pagenum: 1,
        pagesize: 5
        },
        total: 4,
        tableData: [{
          date: '608-1',
          name:  '(1,1)',
          address: '上海市普陀区金沙江路 1518 弄',
          time:'2021.5.16 22:07'
        }, {
          date: '608-2',
          name: '(1,2)',
          address: '上海市普陀区金沙江路 1517 弄',
          time:'2021.5.16 22:07'
        }, {
          date: '608-3',
          name: '(1,3)',
          address: '上海市普陀区金沙江路 1519 弄',
          time:'2021.5.16 22:07'
        }, {
          date: '608-4',
          name: '(1,4)',
          address: '上海市普陀区金沙江路 1516 弄',
          time:'2021.5.16 22:07'
        }]
      }
    },
    methods:{
      async userStateChanged(userInfo) {
      // const { data: res } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
      // if (res.meta.status !== 200) {
      //   userInfo.mg_state = !userInfo.mg_state
      //   return this.$message.error({
      //     message: res.meta.msg,
      //     duration: 1000,
      //   })
      // }
    },
    handleSizeChange(newSize){
      this.queryInfo.pagesize = newSize
      // this.getOrderList()
    },
    handleCurrentChange(newPage){
      this.queryInfo.pagenum = newPage
      // this.getOrderList()
    },
    getComputerList(){

    }
    }
}
</script>

<style lang="scss" scoped>
  .el-breadcrumb{
    margin-bottom: 15px;
  }
  .el-table{
    margin: 15px 0;
  }
</style>