<template>
  <div class="body">
    <div class="histogram">
      <div id="myChart" :style="{width: '100%', height: '400px'}"></div>
    </div>
  </div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
import { api } from "../api/api";
import { url } from "../api/url";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getData();
  },
  methods: {
    myChart(data) {
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
          source: data
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }]
      });
    },
    getData() {
      let end = new Date();
      let begin = new Date(end.getTime() - 1000 * 60 * 60 * 24 * 7 * 4); // define the day which before a week
      let payee = [];
      var pay = [];
      let date = [];
      let showData = [];
      api.calculate(url.receipt_calculateURL, begin, end).then(res => {
        payee = res[1]; // data
        date = res[0]; // date
        api.calculate(url.pay_calculateURL, begin, end).then(res => {
          pay = res[1];
          showData[0] = ["product", "总支出", "总收入", "利润"];
          for (let i = 0; i < date.length; i++) {
            showData[i + 1] = [date[i], pay[i], payee[i], payee[i] - pay[i]];
          }
          console.log(showData);
          this.myChart(showData);
        });
      });
    }
  }
};
</script>


<style scoped>
@import url("../css/finance.css");
</style>
