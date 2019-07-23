<template>
  <div>
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
.header {
  width: 100%;
  height: auto;
  display: flex;
  margin-top: 0.5%;
}
.word {
  width: 30%;
  height: auto;
  font-size: 16px;
  color: black;
  margin-top: 0.3%;
}
.common {
  margin: 5px 0;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.histogram {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
}
</style>
