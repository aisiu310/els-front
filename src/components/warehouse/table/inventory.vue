<template>
  <div>
    <Table :columns="columns" :data="data" :stripe="true" ref="table"></Table>

    <div class="bottom">
      <div class="print">
        <Button type="primary" @click="exportData()" v-if="time != null">
          <Icon type="ios-download-outline"></Icon>打印原数据
        </Button>
        <Button type="primary" @click="update()" v-if="area != null">
          <Icon type="md-refresh" />更新库存信息
        </Button>
      </div>
      <div class="anotherPage">
        <Page :total="dataLength" :current="currentPage" show-elevator @on-change="changePage" />
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
  props: ["area", "time"],
  // watch: {
  //   area(val, oldVal) {
  //     console.log(val);
  //   }
  // },
  mounted() {
    this.initData();
  },
  methods: {
    // divide page
    changePage(val) {
      let self = this;
      this.$axios
        .get(
          "http://localhost:8031/inventory/getInventory?area=" +
            self.area +
            "&inventoryName=南京中转中心仓库&skipCount=" +
            val
        )
        .then(res => {
          self.data = res.data.data[0];
        });
    },
    // export data to excel
    exportData(type) {
      this.$refs.table.exportCsv({
        filename: "盘点数据"
      });
    },
    // update inventory data through in/out
    update() {
      alert(this.area);
    },
    // init data
    initData() {
      let self = this;
      this.$axios
        .get(
          "http://localhost:8031/inventory/getInventory?area=" +
            self.area +
            "&inventoryName=南京中转中心仓库&skipCount=1"
        )
        .then(res => {
          self.data = res.data.data[0];
          self.dataLength = res.data.data[1];
        });
    }
  }
};
</script>

<style scoped>
@import url("../warehouse_css/common.css");
</style>
