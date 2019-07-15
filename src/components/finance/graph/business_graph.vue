<template>
  <div>
    <div class="header">
      <div class="word">经营情况表</div>
      <div>
        <DatePicker
          type="date"
          :format="date"
          placeholder="Select date"
          style="width: 200px"
          @on-change="beginTime"
        ></DatePicker>
        <DatePicker
          type="date"
          :formate="date"
          placeholder="Select date"
          style="width: 200px"
          @on-change="endTime"
        ></DatePicker>
        <Button type="primary" shape="circle" @click="searchByTime()">查询</Button>
      </div>
    </div>
    <hr class="common" />
    <div class="histogram">
      <div>
        <div id="payee" :style="{width: '100%', height: '300px'}"></div>
      </div>
      <div>
        <div id="pay" :style="{width: '100%', height: '300px'}"></div>
      </div>
    </div>
    <div class="lineChart">
      <div id="myChart" :style="{width: '80%', height: '300px'}"></div>
    </div>
  </div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
export default {
  data() {
    return {
      payNumber: [],
      begin: "",
      end: ""
    };
  },
  mounted() {
    this.getPayData();
    this.payee();
    this.pay();
    this.myChart();
  },
  methods: {
    payee() {
      let payee = echarts.init(document.getElementById("payee"));
      payee.setOption({
        title: {
          text: "收款单"
        },
        xAxis: {
          type: "category",
          data: ["07/08", "07/09", "07/10", "07/11", "07/12", "07/13", "07/14"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [120, 132, 101, 134, 90, 230, 210],
            type: "bar"
          }
        ]
      });
    },
    pay() {
      let pay = echarts.init(document.getElementById("pay"));
      pay.setOption({
        title: {
          text: "付款单"
        },
        xAxis: {
          type: "category",
          data: ["07/08", "07/09", "07/10", "07/11", "07/12", "07/13", "07/14"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [120, 132, 101, 134, 90, 230, 210],
            type: "bar"
          }
        ]
      });
    },
    myChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "经营情况表"
        },
        tooltip: {
          trigger: "axis"
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
          data: ["07/08", "07/09", "07/10", "07/11", "07/12", "07/13", "07/14"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "收款单",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "付款单",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      });
    },
    getPayData() {
      this.$http
        .get(
          "http://localhost:8021/pay/calculate?begin=2019-07-03&end=2019-07-13"
        )
        .then(res => {});
    },
    beginTime(val) {
      this.begin = val;
    },
    endTime(val) {
      this.end = val;
    },
    searchByTime() {
      if (begin == null || end == null) {
        this.$Message.error("请选择日期！");
      } else {
        alert(this.begin);
        alert(this.end);
      }
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
}

.histogram > div {
  width: 50%;
  height: auto;
  display: flex;
  justify-content: center;
}

.lineChart {
  display: flex;
  justify-content: center;
}
</style>
