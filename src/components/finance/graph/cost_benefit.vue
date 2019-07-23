<template>
  <div class="body">
    <div class="header">
      <div class="word">成本收益表</div>
    </div>
    <hr class="common" />
    <div class="histogram">
      <div id="myChart" :style="{width: '80%', height: '400px'}"></div>
    </div>
  </div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
export default {
  data() {
    return {};
  },
  mounted() {
    this.myChart();
  },
  methods: {
    myChart() {
      //   基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "经营情况表"
        },
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ["product", "总支出", "总收入", "利润"],
            ["07/08", 53.3, 85.8, 33.5],
            ["07/09", 60.1, 73.4, 13.3],
            ["07/10", 50.4, 65.8, 15.4],
            ["07/11", 57.8, 89.9, 32.1]
          ]
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }]
      });
    }
  }
};
</script>


<style scoped>
@import url("../css/finance.css");
</style>
