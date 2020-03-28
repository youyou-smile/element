<template>
  <div id="goods_num">
    <!-- 头部 -->
    <el-form :inline="true">
      <el-form-item label="时间范围">
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- echarts -->
    <div id="mycharts" style="width: 100%;height:400px;"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 起始时间范围选择数据
      value1: "",
      xAxis:[],
      yAxis:[]
    };
  },
  mounted() {
    this.axios.get('http://work.08321.org/sell/counter.php?a=goods&field=date')
    .then(d=>{
      d.data.data.forEach(v=>{
        this.xAxis.push(v.ctime);
        this.yAxis.push(v.num);
      })
      this.drawLine();
    });
  },
  methods: {
    //   点击提交事件
    /*
    onSubmit() {
      console.log(this.value1)
    },
    */
    // 绘制统计图
    drawLine() {
      var that = this;
      // 基于准备好的dom，初始化echarts实例
      var myChart = that.$echarts.init(document.getElementById("mycharts"));
      // 绘制图表
      myChart.setOption({
        title: {text: '每日新增商品量',subtext:'单位（件）'},
         tooltip: {trigger: 'axis'},
        xAxis: {type: "category",data: this.xAxis},
        yAxis: {type: "value"},
        series: [{data:this.yAxis,type: "line"}]
      });
    }
  }
};
</script>





