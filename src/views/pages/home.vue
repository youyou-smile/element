<template>
  <div id="home" class="box">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-white">
          <i class="el-icon-tickets" style="color:#1296db"></i>
          <div class="desc">
            <span>总订单</span>
            <strong>102400</strong>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-white">
          <i class="el-icon-tickets" style="color:#d4237a"></i>
          <div class="desc">
            <span>总销售额</span>
            <strong>102400</strong>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-white">
          <i class="el-icon-tickets" style="color:#1296db"></i>
          <div class="desc">
            <span>今日订单数</span>
            <strong>102400</strong>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-white">
          <i class="el-icon-tickets" style="color:#1afa29"></i>
          <div class="desc">
            <span>今日销售额</span>
            <strong>102400</strong>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- echarts -->
    <div class="echarts bg-white">
      <div id="mycharts" style="width:100%;height:500px;padding: 30px 10px;"></div>
    </div>
  </div>
</template>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.box {
  background-color: #f0f2f5;
}
.el-col {
  border-radius: 4px;
}
.bg-white {
  background: #fff;
}
.grid-content {
  display: flex;
  justify-content: space-around;
  border-radius: 4px;
  min-height: 36px;
  align-items: center;
  padding-right: 26px;
}
#home .grid-content i {
  font-size: 80px;
}
.desc {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 26px;
  color: #999;
}
strong {
  color: #444;
  font-weight: bold;
}
</style>


<script>
export default {
  name: "eCharts",
  data() {
    return {
       xAxis:[],
       yAxis:[],
    };
  },
  mounted() {
    this.axios.get('http://work.08321.org/sell/counter.php?a=users&field=date')
    .then(d=>{
      d.data.data.forEach(v=>{
        this.xAxis.push(v.ctime);
        this.yAxis.push(v.num);
      });
    this.drawLine();

    })
  },
  methods: {
    drawLine() {
      var that = this;
      // 基于准备好的dom，初始化echarts实例
      var myChart = that.$echarts.init(document.getElementById("mycharts"));
      // 绘制图表
      myChart.setOption({
        title: { text: "每日账户注册量", subtext:'人数（单位 ：个）'},
        tooltip: {trigger: 'axis'},
        xAxis: {type: "category",data:this.xAxis},
        yAxis: {type: "value"},
        series: [{data:this.yAxis,type: "bar"}]
      });
    }
  }
};
</script>


