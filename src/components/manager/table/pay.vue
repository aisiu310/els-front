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
        <!-- <Button type="primary" shape="circle" @click="check()">批量审批</Button> -->
      </div>
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
      payData: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      showCheckbox: true,
      selectArr: [],
      selectState: "待审核"
    };
  },
  mounted() {
    this.initPayData(this.selectState, this.currentPage, this.pageSize);
  },
  methods: {
    // init Data
    initPayData(selectState, currentPage, pageSize) {
      let statePO = {
        state: selectState,
        currentPage: currentPage,
        pageSize: pageSize
      };
      api.getDataToManager(url.finance_pay_getURL, statePO).then(res => {
        if (res != null) {
          this.payData = res[0];
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
    // as func
    showDataByState(val) {
      this.initPayData(val, this.currentPage, this.pageSize);
    },
    // get ths list of id to check
    seclection(selection, row) {
      this.deleteArr = selection;
    },
    // pass
    pass(index) {
      if (this.payData[index].state == "待审核") {
        let checkPO = {
          id: this.payData[index].id,
          state: "审核通过"
        };
        api.updateDataToManager(url.finance_pay_checkURL, checkPO).then(res => {
          if (res == 1) {
            this.initPayData(this.selectState, this.currentPage, this.pageSize);
          }
        });
      } else {
        this.$Message.error("已审核！");
      }
    },
    // lose
    lose(index) {
      if (this.payData[index].state == "待审核") {
        let checkPO = {
          id: this.payData[index].id,
          state: "审核不通过"
        };
        api.updateDataToManager(url.finance_pay_checkURL, checkPO).then(res => {
          if (res == 1) {
            this.initPayData(this.selectState, this.currentPage, this.pageSize);
          }
        });
      } else {
        this.$Message.error("已审核！");
      }
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
        width: 100
      });
      columns.push({
        title: "付款账户",
        key: "payAccount"
      });
      columns.push({
        title: "审核状态",
        key: "state",
        sortable: true
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
  }
};
</script>

<style scoped>
@import url("../css/manager.css");
</style>

