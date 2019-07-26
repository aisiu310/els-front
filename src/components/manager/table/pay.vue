<template>
  <div class="body">
    <div class="header">
      <Button type="primary" shape="circle" @click="batchDel()">批量审批</Button>
    </div>
    <Table
      :data="payData"
      :columns="tableColumns"
      @on-select="seclection"
      @on-select-cancel="seclection"
      @on-select-all="seclection"
      @on-select-all-cancel="seclection"
      ref="payTable"
    ></Table>
    <!-- page -->
    <div class="page">
      <Page :total="dataLength" :current="currentPage" show-elevator @on-change="changePage" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      payData: [],
      dataLength: 0,
      currentPage: 1,
      showCheckbox: true,
      selectArr: []
    };
  },
  mounted() {
    this.initPayData(this.currentPage);
  },
  methods: {
    // init Data
    initPayData(page) {},
    // page
    changePage(val) {
      this.initPayData(val);
    },
    // show detail pay data
    show(index) {
      this.$Modal.info({
        title: "收款单信息",
        content: `编号:${this.payData[index].id}<br>付款日期：${this.payData[index].payDate}<br>付款金额：${this.payData[index].payMoney}<br>付款人：${this.payData[index].payName}<br>付款账户：${this.payData[index].payAccount}<br>付款条目：${this.payData[index].payList}<br>备注：${this.payData[index].payRemarks}<br>状态：${this.payData[index].state}`
      });
    },
    // get ths list of id to check
    seclection(selection, row) {
      this.deleteArr = selection;
    },
    // check
    check(index) {}
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
        title: "付款单编号",
        width: 100,
        tooltip: true,
        key: "id"
      });
      columns.push({
        title: "付款日期",
        key: "payDate",
        width: 150,
        sortable: true
      });
      columns.push({
        title: "付款金额",
        width: 120,
        key: "payMoney",
        sortable: true
      });
      columns.push({
        title: "付款人",
        key: "payName",
        sortable: true
      });
      columns.push({
        title: "付款账户",
        key: "payAccount",
        sortable: true
      });
      columns.push({
        title: "审核状态",
        key: "state",
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
          return row.state.indexOf(value) > -1;
        }
      });
      columns.push({
        title: "操作",
        key: "action",
        width: 160,
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
              "通过"
            ),
            h(
              "Button",
              {
                props: {
                  type: "success",
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
              "不通过"
            )
          ]);
        }
      });
      return columns;
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

