<template>
  <div class="check_body">
    <div class="header">
      <div class="select">
        <Select v-model="selectState" style="width:150px" @on-change="showDataByState">
          <Option value="待审核">待审核</Option>
          <Option value="已审核">已审核</Option>
        </Select>
      </div>
      <div class="button">
        <Button type="primary" shape="circle" @click="check()">批量审批</Button>
      </div>
    </div>

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
    <div class="page">
      <Page
        :total="total"
        :current="currentPage"
        show-elevator
        show-total
        show-sizer
        :page-size="pageSize"
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      />
    </div>
  </div>
</template>

<script>
import { api } from "../api/api";
import { url } from "../api/url";
export default {
  data() {
    return {
      // table data
      payeeData: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      showCheckbox: true,
      tableSize: "default",
      // batch delete
      seletion: [],
      // state
      selectState: "待审核"
    };
  },
  mounted() {
    this.initPayData(this.selectState, this.currentPage, this.pageSize);
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
                  type: "success",
                  size: "small"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    this.pass(params.index);
                  }
                }
              },
              "通过"
            ),
            h(
              "Button",
              {
                props: {
                  type: "error",
                  size: "small"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    this.lose(params.index);
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
  },
  methods: {
     // init Data
    initPayData(selectState, currentPage, pageSize) {
      let statePO = {
        state: selectState,
        currentPage: currentPage,
        pageSize: pageSize
      };
      api.getDataToManager(url.finance_payee_getURL, statePO).then(res => {
        if (res != null) {
          this.payeeData = res[0];
          this.total = res[1];
        }
      });
    },
    // page
    changePage(val) {
      this.initPayData(this.selectState, val, this.pageSize);
    },
    // pageSize
    changePageSize(val) {
      this.initPayData(this.selectState, this.currentPage, val);
    },
    check(index) {},
    batchSelect(selection, row) {
      this.seletion = selection;
    },
    show(index) {
      this.$Modal.info({
        title: "付款单信息",
        content: `编号:${this.payeeData[index].id}<br>所属营业厅：${this.payeeData[index].code}<br>收款日期：${this.payeeData[index].time}<br>收款金额：${this.payeeData[index].money}<br>收款快递员：${this.payeeData[index].courierName}<br>所有收款订单号：${this.payeeData[index].orderList}<br>状态：${this.payeeData[index].state}`
      });
    },
    showDataByState(val){
       this.initPayData(val, this.currentPage, this.pageSize);
    }
  }
};
</script>

<style scoped>
@import url("../css/manager.css");
</style>
