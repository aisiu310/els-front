<template>
  <div>
    <Table
      :border="showBorder"
      :stripe="showStripe"
      :show-header="showHeader"
      :size="tableSize"
      :data="payData"
      :columns="tableColumns"
      @on-select="check"
    ></Table>

    <!-- page -->
    <div class="page">
      <Page :total="dataLength" show-elevator @on-change="changePage" />
    </div>
  </div>
</template>
<script>
import bus from "../reuse/bus";
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
    var tableData = [
      {
        id: "2019070304",
        pay_date: "2019-07-04",
        pay_money: "123",
        pay_name: "John Brown",
        pay_account: "John Brown",
        pay_list:
          "123456,1234567,12345678,123456,1234567,12345678,123456,1234567,12345678",
        pay_remarks: "无",
        state: "待审核"
      }
    ];
    this.dataLength = tableData.length;
    this.payData = tableData.slice(0, 10);
  },
  methods: {
    changePage(val) {
      // invoke the back-end API limit 10
      // 后端分页查询
      var tableData = [
        {
          id: "2019070304",
          pay_date: "2019-07-04",
          pay_money: "123",
          pay_name: "John Brown",
          pay_account: "John Brown",
          pay_list: "123456,1234567,12345678",
          pay_remarks: "无",
          state: "待审核"
        }
      ];
      this.payData = tableData.slice((val - 1) * 10, val * 10);
    },
    show(index) {
      this.$Modal.info({
        title: "收款单信息",
        content: `编号:${this.payData[index].id}<br>付款日期：${this.payData[index].pay_date}<br>付款金额：${this.payData[index].pay_money}<br>付款人：${this.payData[index].pay_name}<br>付款账户：${this.payData[index].pay_account}<br>付款条目：${this.payData[index].pay_list}<br>备注：${this.payData[index].pay_remarks}<br>状态：${this.payData[index].state}`
      });
    },
    // del payee and get the data which is from back-end
    remove(index) {
      this.payData.splice(index, 1);
    },
    // send id to settle_accounts
    check(val, obj) {
      bus.$emit("check_id", obj.id);
      console.log(val);
      console.log(obj.id);
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
        key: "id"
      });
      columns.push({
        title: "付款日期",
        key: "pay_date",
        sortable: true
      });
      columns.push({
        title: "付款金额",
        width: 100,
        key: "pay_money"
      });
      columns.push({
        title: "付款人",
        key: "pay_name",
        sortable: true
      });
      columns.push({
        title: "付款账户",
        key: "pay_account",
        sortable: true
      });
      columns.push({
        title: "条目",
        tooltip: true,
        key: "pay_list"
      });
      columns.push({
        title: "备注",
        tooltip: true,
        key: "pay_remarks"
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
        width: 150,
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
.page {
  width: auto;
  height: auto;
  text-align: right;
  margin-top: 0.5%;
  margin-right: 3%;
  margin-bottom: 0.5%;
}
</style>

