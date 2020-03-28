<template>
  <div id="admin_list" class="box">
    <el-table ref="adminlistTable" :data="tableData" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="ID" width="100">
        <template slot-scope="scope">{{ scope.row.id}}</template>
      </el-table-column>
      <el-table-column label="账号" show-overflow-tooltip width="180">
        <template slot-scope="scope">{{ scope.row.account}}</template>
      </el-table-column>
      <el-table-column prop="item" label="用户组" width="140">
        <template slot-scope="scope">{{ scope.row.userGroup}}</template>
      </el-table-column>
      <el-table-column prop="date" label="创建时间" width="200">
        <template slot-scope="scope">{{ scope.row.ctime}}</template>
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="del()">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分布器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="50"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 取消/全部删除按钮 -->
    <div style="margin-top: 20px" class="result">
      <el-button @click="del" type="danger">批量删除</el-button>
      <el-button @click="toggleSelection([tableData[0], tableData[2]])" type="danger">切换第一、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()" type="primary">取消选择</el-button>
    </div>
  </div>
</template>

<style>
#admin_list .result {
  padding: 10px 20px;
}
</style>

<script>
export default {
  data() {
    return {
      tableData: [],
      // 分页器数据
      total:1,
      currentPage:1,
      pageSize:10
    };
  },
  created() {
    this.pageChange();  //调用翻页函数
  },
  methods: {
    // 点击‘编辑’执行的函数
    edit(id){
      this.$router.push('/index/admin_edit/'+id); //点击‘编辑’，跳转页面，通过路由传 id 值
    },
    del() {
      //console.log(index, row);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.adminlistTable.toggleRowSelection(row);
        });
      } else {
        // 取消所有选中项
        this.$refs.adminlistTable.clearSelection();
      }
    },
    // 批量删除按钮事件函数
    delAll() {
      this.$refs.adminlistTable.selection.forEach(v => {
       this.axios.get(`http://work.08321.org/sell/users.php?a=delete&${v.id}`).then()
      });
    },
    // 分页器方法
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize=val;
      this.pageChange();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage=val;
      this.pageChange();
    },
    // 封装翻页函数
    pageChange(){
      this.axios.get(`http://work.08321.org/sell/users.php?a=list&currentPage=${this.currentPage}&pageSize=${this.pageSize}`).then(d => {
      this.tableData = d.data.data; //将获取到的后端数据赋值给tableData
      this.total=parseInt(d.data.total)
    });
    }
  }
};
</script>
/index/admin_edit