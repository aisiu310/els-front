<template>
  <div class="body">
    <div class="header">
      <div class="word">经营情况表</div>
      <div>
        <DatePicker type="date" v-model="begin" placeholder="请选择起始日期" style="width: 200px"></DatePicker>
        <DatePicker type="date" v-model="end" placeholder="请选择截止日期" style="width: 200px"></DatePicker>
        <Button type="primary" shape="circle" @click="searchByTime()">查询</Button>
      </div>
    </div>
    <hr class="common" />
    <div id="payee" :style="{width: '100%', height: '300px'}"></div>
    <div id="pay" :style="{width: '100%', height: '300px'}"></div>
    <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
  </div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
import { api } from "../api/api";
import { url } from "../api/url";
export default {
  data() {
    return {
      payNumber: [],
      begin: "",
      end: new Date(),
      payeeData: [],
      calculateDate: [],
      payData: []
    };
  },
  mounted() {
    this.begin = new Date(this.end.getTime() - 1000 * 60 * 60 * 24 * 7 * 3); // define the day which before a week
    this.getPayData(this.begin, this.end);
    this.getPayeeData(this.begin, this.end);
  },
  methods: {
    payee(date, money) {
      let payee = echarts.init(document.getElementById("payee"));
      payee.setOption({
        title: {
          text: "收款单"
        },
        xAxis: {
          type: "category",
          data: date
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: money,
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "inside"
              }
            }
          }
        ]
      });
    },
    pay(date, money) {
      let pay = echarts.init(document.getElementById("pay"));
      pay.setOption({
        title: {
          text: "付款单"
        },
        xAxis: {
          type: "category",
          data: date
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: money,
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "inside"
              }
            }
          }
        ]
      });
    },
    myChart(date, payee, pay) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "经营情况表"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["收款单", "付款单"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "收款单",
            type: "line",
            stack: "总量",
            data: payee
          },
          {
            name: "付款单",
            type: "line",
            stack: "总量",
            data: pay
          }
        ]
      });
    },
    getPayeeData(begin, end) {
      api.calculate(url.receipt_calculateURL, begin, end).then(res => {
        this.payee(res[0], res[1]);
        this.payeeData = res[1];
        this.calculateDate = res[0];
      });
    },
    getPayData(begin, end) {
      api.calculate(url.pay_calculateURL, begin, end).then(res => {
        this.pay(res[0], res[1]);
        this.payData = res[1];
      });
    },
    searchByTime() {
      if (this.begin == null || this.end == null) {
        this.$Message.error("请选择日期！");
      } else {
        this.getPayeeData(this.begin, this.end);
        this.getPayData(this.begin, this.end);
        this.myChart(this.calculateDate, this.payeeData, this.payData);
      }
    }
  }
};
</script>

<style scoped>
@import url("../css/finance.css");
</style>
