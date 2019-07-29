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

    <Table :size="tableSize" :data="payeeData" :columns="tableColumns" ref="payeeTable"></Table>
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
      showIndex: true,
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
          if (selectState == "待审核") {
            this.$Notice.info({
              title: "您还有" + res[0].length + "条收款单待审核"
            });
          }
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
    showDataByState(val) {
      this.initPayData(val, this.currentPage, this.pageSize);
    },
    // pass
    pass(index) {
      if (this.payeeData[index].state == "待审核") {
        var checkPO = {
          id: this.payeeData[index].id,
          state: "审核通过"
        };
        api
          .updateDataToManager(url.finance_payee_checkURL, checkPO)
          .then(res => {
            if (res == 1) {
              this.initPayData(
                this.selectState,
                this.currentPage,
                this.pageSize
              );
            }
          });
      } else {
        this.$Message.error("已审核！");
      }
    },
    // lose
    lose(index) {
      if (this.payeeData[index].state == "待审核") {
        var checkPO = {
          id: this.payeeData[index].id,
          state: "审核不通过"
        };
        api
          .updateDataToManager(url.finance_payee_checkURL, checkPO)
          .then(res => {
            if (res == 1) {
              this.initPayData(
                this.selectState,
                this.currentPage,
                this.pageSize
              );
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
        width: 160,
        sortable: true
      });
      columns.push({
        title: "收款金额",
        width: 120,
        key: "money",
        sortable: true
      });
      columns.push({
        title: "收款快递员 ",
        key: "courierName",
        width: 120
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
        sortable: true
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
  }
};
</script>

<style scoped>
@import url("../css/manager.css");
</style>
