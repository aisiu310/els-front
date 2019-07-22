<template>
  <div>
    <Table
      :border="showBorder"
      :stripe="showStripe"
      :show-header="showHeader"
      :size="tableSize"
      :data="payData"
      :columns="tableColumns"
      @on-select="mulCheck"
      @on-select-all="selectAll"
      ref="payTable"
    ></Table>

    <!-- page -->
    <div class="expand">
      <div class="excel">
        <Button type="primary" @click="exportData()">
          <Icon type="ios-download-outline"></Icon>导出Excel
        </Button>
      </div>
      <div class="page">
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
      payData: [],
      dataLength: 0,
      showBorder: true,
      showStripe: true,
      showHeader: true,
      showCheckbox: true,
      tableSize: "default"
    };
  },
  mounted() {
    this.getPayData();
  },
  methods: {
    changePage(val) {
      // invoke the back-end API limit 10
      // 后端分页查询
      this.$http
        .get(
          "http://localhost:8021/pay/getAllPay?skip=" + val + "&pageCount=10"
        )
        .then(res => {
          this.payData = res.data.data[0];
        });
    },
    show(index) {
      this.$Modal.info({
        title: "收款单信息",
        content: `编号:${this.payData[index].id}<br>付款日期：${this.payData[index].payDate}<br>付款金额：${this.payData[index].payMoney}<br>付款人：${this.payData[index].payName}<br>付款账户：${this.payData[index].payAccount}<br>付款条目：${this.payData[index].payList}<br>备注：${this.payData[index].payRemarks}<br>状态：${this.payData[index].state}`
      });
    },
    // del payee and get the data which is from back-end
    remove(index) {
      this.$http
        .delete(
          "http://localhost:8021/pay/deletePay?id=" + this.payData[index].id
        )
        .then(res => {
          if (res.data.data) {
            this.$Message.success("删除成功!");
            this.payData.splice(index, 1);
            this.getPayData();
          } else {
            this.$Message.error(res.data.data);
          }
        });
    },
    // check
    check(index) {
      if (this.payData[index].state == "待审核") {
        this.$Message.error("已提交审核，请等待总经理审批");
      } else {
        this.$http
          .get(
            "http://localhost:8021/pay/updatePay?id=" +
              this.payData[index].id +
              "&state='待审核'"
          )
          .then(res => {
            if (res.data.data == 1) {
              this.payData[index].state = "待审核";
              this.$Message.success("提交成功，请等待总经理审批");
            }
          });
      }
    },
    // batch check
    mulCheck(val, obj) {
      bus.$emit("pay_batch_check", val);
      console.log(val);
    },
    selectAll(val) {
      console.log(val);
      bus.$emit("pay_batch_del", val);
    },
    // export data by excel
    exportData() {
      this.$refs.payTable.exportCsv({
        filename: "付款单",
        columns: this.tableColumns.filter(
          (col, index) => index < 9 && index > 0
        ),
        data: this.payData.filter((payData, index) => index < 9)
      });
    },
    // 获取数据
    getPayData() {
      this.$http
        .get("http://localhost:8021/pay/getAllPay?skip=1&pageCount=10")
        .then(res => {
          this.payData = res.data.data[0];
          this.dataLength = res.data.data[1];
        });
    }
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
              "查看"
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
              "提交审核"
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
.expand {
  width: auto;
  display: flex;
}

.excel {
  width: 50%;
  height: auto;
  margin-top: 0.5%;
  margin-bottom: 0.5%;
}
.page {
  width: 47%;
  height: auto;
  text-align: right;
  margin-top: 0.5%;
  margin-right: 3%;
  margin-bottom: 0.5%;
}
</style>

