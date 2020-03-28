<template>
  <div id="goods_list" class="box">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="商品ID" width="180">
        <template slot-scope="scope">
          <i class="el-icon-arrow-right"></i>
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.goodsname}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品特色" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.goodsfeature}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品图片" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.imgUrl" alt />
        </template>
      </el-table-column>
      <el-table-column label="描述" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.goodsdesc}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页面 -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10,15]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>


<script>
import qs from "qs";
export default {
  data() {
    return {
      total: 1,
      currentPage: 1,
      pageSize: 10,
      //   表格数据
      tableData: [
        {
          id: "",
          goodsname: "",
          goodsdesc: ""
        }
      ]
    };
  },
  created() {
    this.pageChange();
  },
  methods: {
    //   删除、编辑 操作函数
    edit(id) {
      this.$router.push('/index/goods_edit/'+id)
    },
    del(id) {
      this.axios.get('http://work.08321.org/sell/goods.php?a=delete&'+id)
      .then(d=>{
        if(d.data.code==0){
          this.$message({
            message:'删除成功',
            type:'success'
          });
          this.pageChange()
        }else{
          this.$message.error(d.data.msg)
        }
      })

    },
    // 分页函数
    sizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.pageChange();
    },
    currentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.pageChange();
    },
    // 封装页面渲染商品数据的函数
    pageChange() {
      var that = this;
      var data = qs.stringify({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
      this.axios
        .get(`http://work.08321.org/sell/goods.php?a=list&${data}`)
        .then(d => {
          that.total = parseInt(d.data.total);
          that.tableData = d.data.data;
        });
    }
  }
};
</script>

<style>
#goods_list .el-pagination {
  padding: 10px 5px;
}
#goods_list img {
  width: 100%;
  max-height: 100px;
}
#goods_list .el-table--enable-row-transition .el-table__body td{
  height: 131px;
}
</style>
