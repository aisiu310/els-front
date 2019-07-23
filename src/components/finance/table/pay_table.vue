<template>
  <div class="body">
    <div class="header">
      <div class="word">成本管理（付款单）</div>
      <!-- search box -->
      <div class="search">
        <DatePicker
          type="daterange"
          v-model="limitTime"
          placeholder="请选择截止日期,不包括截止日期"
          style="width: 300px"
          @on-change="searchByTime"
        ></DatePicker>
      </div>
      <div class="button">
        <Button type="primary" shape="circle" @click="calculate = true">成本结算</Button>
        <!-- calculate pay modal -->
        <Modal title="成本结算" v-model="calculate" :styles="{top: '20px'}" :footer-hide="true">
          <Form :model="calculate_data" :label-width="80">
            <FormItem label="付款日期">
              <Row>
                <Col span="11">
                  <DatePicker type="date" placeholder="选择付款日期" v-model="formItem.date"></DatePicker>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="总金额">
              <Input
                v-model="formItem.money"
                type="number"
                placeholder="付款总金额"
                prefix="logo-usd"
                :disabled="true"
              ></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="calculate_pay()">计算付款金额</Button>
              <Button style="margin-left: 8px" @click="calculate = false">退出</Button>
            </FormItem>
          </Form>
        </Modal>

        <Button type="primary" shape="circle" @click="modal = true">新建付款单</Button>
        <!-- add payee modal -->
        <Modal title="新建付款单" v-model="modal" :styles="{top: '20px'}" :footer-hide="true">
          <Form :model="formItem" :label-width="80">
            <FormItem label="付款日期">
              <Row>
                <Col span="11">
                  <DatePicker type="date" placeholder="选择收款日期" v-model="formItem.date"></DatePicker>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="付款金额">
              <Input v-model="formItem.money" type="number" placeholder="请输入付款金额" prefix="logo-usd"></Input>
            </FormItem>
            <FormItem label="付款人">
              <Input v-model="formItem.name" placeholder="请输入付款人姓名"></Input>
            </FormItem>
            <FormItem label="付款账户">
              <Input v-model="formItem.account" placeholder="请输入付款账户"></Input>
            </FormItem>
            <FormItem label="付款条目">
              <Input
                v-model="formItem.list"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="请输入付款条目"
              ></Input>
            </FormItem>
            <FormItem label="备注">
              <Input v-model="formItem.remarks" placeholder="备注"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="add_pay()">新建</Button>
              <Button style="margin-left: 8px" @click="modal = false">取消</Button>
            </FormItem>
          </Form>
        </Modal>

        <Button type="error" shape="circle" @click="batchDel()">批量删除</Button>
      </div>
    </div>
    <hr class="common" />
    <Table
      :border="showBorder"
      :stripe="showStripe"
      :show-header="showHeader"
      :size="tableSize"
      :data="payData"
      :columns="tableColumns"
      @on-select="deleteSeclection"
      @on-select-cancel="deleteSeclection"
      @on-select-all="deleteSeclection"
      @on-select-all-cancel="deleteSeclection"
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
        <Page :total="dataLength" :current="currentPage" show-elevator @on-change="changePage" />
      </div>
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
      dataLength: 0,
      currentPage: 1,
      showBorder: true,
      showStripe: true,
      showHeader: true,
      showCheckbox: true,
      tableSize: "default",
      modal: false,
      calculate: false,
      deleteArr: [],
      selectTime: [],
      formItem: {
        date: "",
        money: "",
        name: "",
        account: "",
        list: "",
        remarks: ""
      },
      calculate_data: {
        date: "",
        code: "",
        money: ""
      }
    };
  },
  mounted() {
    this.getPayData(this.currentPage);
  },
  methods: {
    // init Data
    initPayData(page) {
      api.initData(url.pay_getURL, page).then(res => {
        if (res != null) {
          this.payData = res[0];
          this.dataLength = res[1];
        }
      });
    },
    // page
    changePage(val) {
      if(this.selectTime == null || this.selectTime == ','){
        this.initPayData(val);
      }else{
        api
          .getDataForTime(
            url.pay_getDataForTimeURL,
            this.selectTime[0],
            this.selectTime[1],
            val
          )
          .then(res => {
            if (res != null) {
              this.payData = res[0];
              this.dataLength = res[1];
            }
          });
      }
    },
    // show detail pay data
    show(index) {
      this.$Modal.info({
        title: "收款单信息",
        content: `编号:${this.payData[index].id}<br>付款日期：${this.payData[index].payDate}<br>付款金额：${this.payData[index].payMoney}<br>付款人：${this.payData[index].payName}<br>付款账户：${this.payData[index].payAccount}<br>付款条目：${this.payData[index].payList}<br>备注：${this.payData[index].payRemarks}<br>状态：${this.payData[index].state}`
      });
    },
    // get ths list of id to delete
    deleteSeclection(selection, row) {
      let id = [];
      for (let i = 0; i < selection.length; i++) {
        id[i] = selection[i].id;
      }
      this.deleteArr = id;
    },
    // del payee and get the data which is from back-end
    batchDel() {
      console.log(this.deleteArr);
      api.delData(url.pay_delURL, this.deleteArr).then(res => {
        if (res != null) {
          this.initPayData(this.currentPage);
          this.$Message.success("删除成功！");
        }
      });
    },
    // check
    check(index) {
      if (this.payData[index].state == "待审核") {
        this.$Message.error("已提交审核，请等待总经理审批");
      } else {
        api.checkByGet(url.pay_checkURL, this.payData[index].id).then(res => {
          if (res == 1) {
            this.payData[index].state = "待审核";
            this.$Message.success("提交成功，请等待总经理审批");
          }
        });
      }
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
    // add pay modal
    add_pay() {
      this.$Message.success("创建成功！");
      this.modal = false;
    },
    // calculate the payee
    calculate_pay() {},
    // 搜索一段时间内的付款单
    searchByTime(val) {
      this.selectTime = val;
      if (val == "," || val == null) {
        this.initPayData(this.currentPage);
      } else {
        api
          .getDataForTime(
            url.pay_getDataForTimeURL,
            val[0],
            val[1],
            this.currentPage
          )
          .then(res => {
            if (res != null) {
              this.payData = res[0];
              this.dataLength = res[1];
            }
          });
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
              "审核"
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
@import url("../css/finance.css");
</style>

