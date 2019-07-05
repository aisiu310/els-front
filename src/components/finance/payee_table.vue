<template>
  <div>
    <Table
      :border="showBorder"
      :stripe="showStripe"
      :show-header="showHeader"
      :size="tableSize"
      :data="payeeData"
      :columns="tableColumns"
      @on-select="mulCheck"
      @on-select-all="selectAll"
      ref="payeeTable"
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
import bus from "../reuse/bus";
export default {
  data() {
    return {
      payeeData: [],
      tableData: [],
      dataLength: 0,
      showBorder: true,
      showStripe: true,
      showHeader: true,
      showCheckbox: true,
      tableSize: "default"
    };
  },
  mounted() {
    this.tableData = [
      {
        id: "201907031201",
        code: "雨花台区",
        date: "2019-06-29",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "未提交审核"
      },
      {
        id: "2019070367601",
        code: "鼓楼区",
        date: "2019-06-25",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "未提交审核"
      },
      {
        id: "201907045301",
        code: "雨花台区",
        date: "2019-07-03",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "未提交审核"
      },
      {
        id: "201907089301",
        code: "秦淮区",
        date: "2019-07-02",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "未提交审核"
      },
      {
        id: "201907480301",
        code: "雨花台区",
        date: "2019-07-01",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "审核通过"
      },
      {
        id: "2019070366601",
        code: "鼓楼区",
        date: "2019-07-03",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "审核通过"
      },
      {
        id: "2019074440301",
        code: "鼓楼区",
        date: "2019-07-03",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "审核通过"
      },
      {
        id: "20190775780301",
        code: "鼓楼区",
        date: "2019-07-03",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "审核通过"
      },
      {
        id: "201907360301",
        code: "鼓楼区",
        date: "2019-07-03",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "审核通过"
      },
      {
        id: "201907452470301",
        code: "鼓楼区",
        date: "2019-07-03",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "审核不通过"
      },
      {
        id: "20190704245301",
        code: "鼓楼区",
        date: "2019-07-03",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "审核不通过"
      },
      {
        id: "20190707894301",
        code: "鼓楼区",
        date: "2019-07-03",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "审核不通过"
      },
      {
        id: "20190704563301",
        code: "鼓楼区",
        date: "2019-07-03",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "审核不通过"
      },
      {
        id: "20190745340301",
        code: "鼓楼区",
        date: "2019-07-03",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "未提交审核"
      },
      {
        id: "20190345370301",
        code: "鼓楼区",
        date: "2019-07-03",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "审核不通过"
      }
    ];
    this.dataLength = this.tableData.length;
    this.payeeData = this.tableData.slice(0, 10);
  },
  methods: {
    changePage(val) {
      // invoke the back-end API limit 10
      // 后端分页查询
      this.payeeData = this.tableData.slice((val - 1) * 10, val * 10);
    },
    show(index) {
      this.$Modal.info({
        title: "付款单信息",
        content: `编号:${this.payeeData[index].id}<br>所属营业厅：${this.payeeData[index].code}<br>收款日期：${this.payeeData[index].state}<br>收款金额：${this.payeeData[index].money}<br>收款快递员：${this.payeeData[index].courier}<br>所有收款订单号：${this.payeeData[index].orderList}<br>状态：${this.payeeData[index].state}`
      });
    },
    // del payee and get the data which is from back-end
    remove(index) {
      this.payeeData.splice(index, 1);
    },
    // send the check's msg to the back-end
    // invoke API
    check(index) {
      if (this.payeeData[index].state == "待审核") {
        this.$Message.error("已提交审核，请等待总经理审批");
      } else {
        this.$Message.success("提交成功，待总经理审批");
        this.payeeData[index].state = "待审核";
      }
    },
    // batch check
    mulCheck(val, obj) {
      bus.$emit("payee_batch_check", val);
      console.log(val);
    },
    selectAll(val) {
      console.log(val);
      bus.$emit("payee_batch_del", val);
    },
    // export data by excel
    exportData() {
      this.$refs.payeeTable.exportCsv({
        filename: "收款单",
        columns: this.tableColumns.filter(
          (col, index) => index < 8 && index > 0
        ),
        data: this.payeeData.filter((payeeData, index) => index < 10)
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
        title: "收款单编号",
        key: "id"
      });
      columns.push({
        title: "所属营业厅",
        key: "code",
        sortable: true,
        filters: [
          {
            label: "鼓楼区",
            value: "鼓楼区"
          },
          {
            label: "雨花台区",
            value: "雨花台区"
          },
          {
            label: "秦淮区",
            value: "秦淮区"
          }
        ],
        filterMethod(value, row) {
          return row.code.indexOf(value) > -1;
        }
      });
      columns.push({
        title: "收款日期",
        key: "date",
        sortable: true
      });
      columns.push({
        title: "收款金额",
        width: 100,
        key: "money"
      });
      columns.push({
        title: "收款快递员 ",
        key: "courier",
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
        width: 200,
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
            ),
            h(
              "Button",
              {
                props: {
                  type: "error",
                  size: "small"
                },
                on: {
                  click: () => {
                    this.remove(params.index);
                  }
                }
              },
              "删除"
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

