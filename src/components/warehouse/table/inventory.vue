<template>
  <div>
    <Table :columns="columns" :data="data" :stripe="true" ref="table"></Table>

    <div class="bottom">
      <div class="print">
        <Button type="primary" @click="exportData(1)" v-if="time != null">
          <Icon type="ios-download-outline"></Icon>打印原数据
        </Button>
      </div>
      <div class="anotherPage">
        <Page :total="dataLength" show-elevator @on-change="changePage" />
      </div>
    </div>
  </div>
</template>

<script>
import bus from "../../reuse/bus";
export default {
  data() {
    return {
      dataLength: 0,
      columns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "更新时间",
          key: "lastTime",
          sortable: true,
          width: 200
        },
        {
          title: "架号",
          key: "frame",
          width: 100,
          sortable: true
        },
        {
          title: "排号",
          key: "rowNumber",
          width: 100,
          sortable: true
        },
        {
          title: "位号",
          width: 100,
          key: "status"
        },
        {
          title: "快递单号",
          key: "orderList",
          tooltip: true
        },
        {
          title: "容量",
          key: "capacity",
          sortable: true
        }
      ],
      data: [],
      data1: [
        {
          lastTime: "2019-07-15 15:11:00",
          frame: 1,
          rowNumber: 1,
          status: 1,
          orderList: "123456,123444,222333,222123",
          capacity: 4
        },
        {
          lastTime: "2019-07-15 15:11:00",
          frame: 1,
          rowNumber: 1,
          status: 1,
          orderList: "123456,123444,222333,222123",
          capacity: 4
        },
        {
          lastTime: "2019-07-15 15:11:00",
          frame: 1,
          rowNumber: 1,
          status: 1,
          orderList: "123456,123444,222333,222123",
          capacity: 4
        },
        {
          lastTime: "2019-07-15 15:11:00",
          frame: 1,
          rowNumber: 1,
          status: 1,
          orderList: "123456,123444,222333,222123",
          capacity: 4
        },
        {
          lastTime: "2019-07-15 15:11:00",
          frame: 1,
          rowNumber: 1,
          status: 1,
          orderList: "123456,123444,222333,222123",
          capacity: 4
        },
        {
          lastTime: "2019-07-15 15:11:00",
          frame: 1,
          rowNumber: 1,
          status: 1,
          orderList: "123456,123444,222333,222123",
          capacity: 4
        },
        {
          lastTime: "2019-07-15 15:11:00",
          frame: 1,
          rowNumber: 1,
          status: 1,
          orderList: "123456,123444,222333,222123",
          capacity: 4
        },
        {
          lastTime: "2019-07-15 15:11:00",
          frame: 1,
          rowNumber: 1,
          status: 1,
          orderList: "123456,123444,222333,222123",
          capacity: 4
        },
        {
          lastTime: "2019-07-15 15:11:00",
          frame: 1,
          rowNumber: 1,
          status: 1,
          orderList: "123456,123444,222333,222123",
          capacity: 4
        },
        {
          lastTime: "2019-07-15 15:11:00",
          frame: 1,
          rowNumber: 1,
          status: 1,
          orderList: "123456,123444,222333,222123",
          capacity: 4
        },
        {
          lastTime: "2019-07-15 15:11:00",
          frame: 1,
          rowNumber: 1,
          status: 1,
          orderList: "123456,123444,222333,222123",
          capacity: 4
        },
        {
          lastTime: "2019-07-15 15:11:00",
          frame: 1,
          rowNumber: 1,
          status: 1,
          orderList: "123456,123444,222333,222123",
          capacity: 4
        },
        {
          lastTime: "2019-07-15 15:11:00",
          frame: 1,
          rowNumber: 1,
          status: 1,
          orderList: "123456,123444,222333,222123",
          capacity: 4
        },
        {
          lastTime: "2019-07-15 15:11:00",
          frame: 1,
          rowNumber: 1,
          status: 1,
          orderList: "123456,123444,222333,222123",
          capacity: 4
        },
        {
          lastTime: "2019-07-15 15:11:00",
          frame: 1,
          rowNumber: 1,
          status: 1,
          orderList: "123456,123444,222333,222123",
          capacity: 4
        },
        {
          lastTime: "2019-07-15 15:11:00",
          frame: 1,
          rowNumber: 1,
          status: 1,
          orderList: "123456,123444,222333,222123",
          capacity: 4
        },
        {
          lastTime: "2019-07-15 15:11:00",
          frame: 1,
          rowNumber: 1,
          status: 1,
          orderList: "123456,123444,222333,222123",
          capacity: 4
        },
        {
          lastTime: "2019-07-15 15:11:00",
          frame: 1,
          rowNumber: 1,
          status: 1,
          orderList: "123456,123444,222333,222123",
          capacity: 4
        }
      ]
    };
  },
  props: ["area", "time"],
  mounted() {
    this.dataLength = this.data1.length;
    this.data = this.data1.slice(0, 10);
  },
  methods: {
    changePage(val) {
      // alert(this.area);
      this.data = this.data1.slice((val - 1) * 10, val * 10);
    },
    exportData(type) {
      this.$refs.table.exportCsv({
        filename: "盘点数据"
      });
    }
  }
};
</script>

<style scoped>
@import url("../warehouse_css/common.css");
</style>
