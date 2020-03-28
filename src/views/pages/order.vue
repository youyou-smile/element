<template>
  <div id="order" class="box">
    <el-form :inline="true" :model="formInline" label-position='left'>
      <el-form-item label="订单号">
        <el-input v-model="formInline.orderNum" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item label="收货人">
        <el-input v-model="formInline.user" placeholder="收货人"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formInline.tel" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="formInline.orderState" placeholder="订单状态">
          <el-option label="已下单" value="xd"></el-option>
          <el-option label="已付款" value="fk"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择时间">
        <el-date-picker
          v-model="value2"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 订单表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="订单号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下单时间" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.tel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收货人" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="配送地址" width="230">
        <template slot-scope="scope">
          <span style="margin-right: 10px">{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="送达时间" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.sendTo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户备注" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.remarks }}</span>
        </template>
      </el-table-column>
      <el-table-column label="金额" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.money }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.state }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" min-width="150" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
  </div>
</template>


<script>
export default {
  data() {
    return {
      // 头部选择部分数据
      formInline: {
        orderNum: "",
        user: "",
        tel: "",
        orderState: ""
      },
      //   选择时间模块数据
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value2: "",
      //   订单表格数据
      tableData: [
        {
          number: "123",
          time: "2020-02-02",
          tel: "13800138000",
          address: "上海市普陀区金沙江路 1518 弄",
          name: "小貂蝉",
          sendTo: "2020-02-02 18:00:00",
          remarks: "微辣",
          money: "30",
          state: ""
        },
        {
          number: "123",
          time: "2020-02-02",
          tel: "13800138000",
          address: "上海市普陀区金沙江路 1518 弄",
          name: "小貂蝉",
          sendTo: "2020-02-02 18:00:00",
          remarks: "微辣",
          money: "30",
          state: ""
        }
      ],
    //   分页数据
     currentPage4: 10
    };
  },
  methods: {
    //   头部查询部分方法
    /*
    onSubmit() {
      console.log("submit!");
    },
    */
    // 订单表格部分方法
    /*
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    */
    // 分页功能
    /*
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
    */
  }
};
</script>

<style>
#order > .el-form {
  width: 100%;
  padding: 24px 0;
  text-indent: 8px;
}
#order .el-table {
  border-top: 1px solid #ebeef5;
  margin-bottom: 30px;
}
#order .el-pagination{
    padding-bottom: 40px;
}
</style>