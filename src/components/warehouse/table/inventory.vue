<template>
  <div class="body">
    <Table :columns="columns" :data="data" :stripe="true" ref="table"></Table>
    <div class="bottom">
      <div class="page">
        <Page :total="dataLength" :current="currentPage" show-elevator @on-change="changePage" />
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "../api/api"
export default {
  data() {
    return {
      dataLength: 0,
      currentPage: 1,
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
          key: "state",
          width: 100,
          sortable: true
        }
      ],
      data: []
    };
  },
  props: ["area"],
  mounted() {
    this.initData(this.currentPage);
  },
  methods: {
    // divide page
    changePage(val) {
      this.initData(val);
    },
    // init data
    initData(page) {
      let self = this;
      api.getInventory(self.area, sessionStorage.getItem("organizationName"), page).then(res=>{
        self.data = res[0];
        self.dataLength = res[1];
      })
    }
  }
};
</script>

<style scoped>
@import url("../warehouse_css/common.css");
</style>
