<template>
  <div>
    <div class="top">
      <div class="word">库存盘点</div>
      <div class="middle"></div>
      <div class="button">
        <DatePicker type="date" v-model="limitTime" placeholder="请选择截止日期,不包括截止日期" style="width: 300px" @on-change="getDate"></DatePicker>
      </div>
    </div>
    <hr />
    <div>
      <Table :columns="columns" :data="data" :stripe="true" ref="table"></Table>
      <div class="bottom">
        <div class="print">
          <Button type="primary" size="large" @click="exportData()">
            <Icon type="ios-download-outline"></Icon>导出到excel
          </Button>
        </div>
        <div class="anotherPage">
          <Page :total="dataLength" :current="currentPage" show-elevator @on-change="changePage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "../api/api";
export default {
  data() {
    return {
      dataLength: 0,
      currentPage: 1,
      limitTime: new Date(),
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
          title: "区域",
          key: "area",
          width: 200,
          filters: [
            { label: "航运区", value: "航运区" },
            { label: "铁运区", value: "铁运区" },
            { label: "汽运区", value: "汽运区" },
            { label: "机动区", value: "机动区" }
          ],
          filterMethod(value, row) {
            return row.area.indexOf(value) > -1;
          }
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
  mounted() {
    this.getAllInventory(this.currentPage);
  },
  methods: {
    // export to excel
    exportData(type) {
      this.$refs.table.exportCsv({
        filename: "盘点数据"
      });
    },
    // init data
    getAllInventory(page) {
      let self = this;
      api.getAllInventory("南京中转中心仓库", self.limitTime, page).then(res => {
        self.data = res;
        self.dataLength = self.data.length;
      });
    },
    getDate(val){
      // alert(this.limitTime);
    },
    // divide page
    changePage(val){
      this.getAllInventory(val);
    }
  }
};
</script>

<style scoped>
@import url("../warehouse_css/common.css");
</style>


