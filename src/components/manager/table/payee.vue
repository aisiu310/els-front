<template>
  <div class="body">
    <div class="header">
      <Button type="primary" shape="circle" @click="check()">批量审批</Button>
    </div>
    <div>
      <Table
        :size="tableSize"
        :data="payeeData"
        :columns="tableColumns"
        @on-select="batchSelect"
        @on-select-cancel="batchSelect"
        @on-select-all-cancel="batchSelect"
        @on-select-all="batchSelect"
        ref="payeeTable"
      ></Table>
    </div>
    <div class="page">
      <Page :total="dataLength" :current="currentPage" show-elevator @on-change="changePage" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // table data
      payeeData: [],
      dataLength: 0,
      currentPage: 1,
      showCheckbox: true,
      tableSize: "default",
      // batch delete
      seletion: []
    };
  },
  mounted() {
    this.initData(this.currentPage);
  },
  computed: {
    tableColumns() {
      let columns = [];
      if (this.showCheckbox) {
        columns.push({
          type: "selection",
          width: 60,
          align: "center"
        });
      }
      if (this.showIndex) {
        columns.push({
          type: "index",
          width: 60,
          align: "center"
        });
      }
      columns.push({
        title: "收款单编号",
        tooltip: true,
        key: "id",
        width: 100
      });
      columns.push({
        title: "收款日期",
        key: "time",
        sortable: true
      });
      columns.push({
        title: "收款金额",
        width: 100,
        key: "money"
      });
      columns.push({
        title: "收款快递员 ",
        key: "courierName",
        width: 120,
        sortable: true
      });
      columns.push({
        title: "所有收款订单号",
        tooltip: true,
        key: "orderList"
      });
      columns.push({
        title: "审核状态",
        key: "state",
        width: 120,
        sortable: true,
        filters: [
          {
            label: "未提交审核",
            value: "未提交审核"
          },
          {
            label: "待审核",
            value: "待审核"
          },
          {
            label: "审核通过",
            value: "审核通过"
          },
          {
            label: "审核不通过",
            value: "审核不通过"
          },
          {
            label: "已结算",
            value: "已结算"
          }
        ],
        filterMethod(value, row) {
          console.log(row);
          return row.is_pass.indexOf(value) > -1;
        }
      });
      columns.push({
        title: "操作",
        key: "action",
        width: 140,
        align: "center",
        render: (h, params) => {
          return h("div", [
            h(
              "Button",
              {
                props: {
                  type: "primary",
                  size: "small"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    this.show(params.index);
                  }
                }
              },
              "查看"
            ),
            h(
              "Button",
              {
                props: {
                  type: "primary",
                  size: "small"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    this.check(params.index);
                  }
                }
              },
              "审核"
            )
          ]);
        }
      });
      return columns;
    }
  },
  methods: {
    check(index) {
    },
    batchSelect(selection, row) {
      this.seletion = selection;
    },
    // page
    changePage(val) {
      this.initData(val);
    },
    // get init data
    initData(skip) {
        
    },
    show(index) {
      this.$Modal.info({
        title: "付款单信息",
        content: `编号:${this.payeeData[index].id}<br>所属营业厅：${this.payeeData[index].code}<br>收款日期：${this.payeeData[index].time}<br>收款金额：${this.payeeData[index].money}<br>收款快递员：${this.payeeData[index].courierName}<br>所有收款订单号：${this.payeeData[index].orderList}<br>状态：${this.payeeData[index].state}`
      });
    }
  }
};
</script>

<style scoped>
.body {
  width: 100%;
  height: auto;
}

.header {
  width: 100%;
  height: auto;
  text-align: right;
  padding-bottom: 5px;
}
.page {
  width: 100%;
  height: auto;
  text-align: right;
  padding: 10px;
}
</style>
