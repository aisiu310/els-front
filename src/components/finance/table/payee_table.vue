<template>
  <div>
    <div class="header">
      <div class="word">结算管理（收款单）</div>
      <div class="search"></div>
      <div class="button">
        <Button type="primary" shape="circle" @click="calculateModal = true">收款结算</Button>
        <!-- calculate payee modal -->
        <Modal title="收款结算" v-model="calculateModal" :styles="{top: '20px'}" :footer-hide="true">
          <Form :model="calculate" :label-width="80">
            <FormItem label="收款日期">
              <Row>
                <Col span="11">
                  <DatePicker type="date" placeholder="选择收款日期" v-model="calculate.date"></DatePicker>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="所属营业厅">
              <Select v-model="calculate.code" placeholder="请选择所属营业厅">
                <Option value="001">鼓楼区</Option>
                <Option value="002">雨花台区</Option>
                <Option value="003">秦淮区</Option>
              </Select>
            </FormItem>
            <FormItem label="总金额">
              <Input
                v-model="calculate.money"
                type="number"
                placeholder="收款总金额"
                prefix="logo-usd"
                :disabled="true"
              ></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click>计算收款金额</Button>
              <Button style="margin-left: 8px" @click="calculateModal = false">退出</Button>
            </FormItem>
          </Form>
        </Modal>

        <Button type="primary" shape="circle" @click="payee = true">新建收款单</Button>
        <!-- add payee modal -->
        <Modal title="新建收款单" v-model="payee" :styles="{top: '20px'}" :footer-hide="true">
          <Form :model="formItem" :label-width="80">
            <FormItem label="所属营业厅">
              <Select v-model="formItem.code" placeholder="请选择所属营业厅">
                <Option value="001">鼓楼区</Option>
                <Option value="002">雨花台区</Option>
                <Option value="003">秦淮区</Option>
              </Select>
            </FormItem>
            <FormItem label="收款日期">
              <Row>
                <Col span="11">
                  <DatePicker type="date" placeholder="选择收款日期" v-model="formItem.date"></DatePicker>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="金额">
              <Input
                v-model="formItem.money"
                type="number"
                placeholder="请输入收款总金额"
                prefix="logo-usd"
              ></Input>
            </FormItem>
            <FormItem label="收款快递员">
              <Input v-model="formItem.courierName" placeholder="请输入收款快递员姓名"></Input>
            </FormItem>
            <FormItem label="收款订单号">
              <Input
                v-model="formItem.orderList"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="请输入收款的订单号，以逗号分割"
              ></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click>新建</Button>
              <Button style="margin-left: 8px" @click="payee = false">取消</Button>
            </FormItem>
          </Form>
        </Modal>

        <Button type="error" shape="circle" @click="batchDelete()">批量删除</Button>
      </div>
    </div>
    <hr class="common" />
    <div>
      <Table
        :border="showBorder"
        :stripe="showStripe"
        :show-header="showHeader"
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
      //calculate modal switch
      calculateModal: false,
      // payee modal switch
      payee: false,
      // calculate data
      calculate: {
        date: new Date(),
        code: "",
        moeny: ""
      },
      // add payee data
      formItem: {
        code: "",
        date: new Date(),
        moeny: "",
        courierName: "",
        orderList: ""
      },
      // table data
      payeeData: [],
      dataLength: 0,
      currentPage: 1,
      showBorder: true,
      showStripe: true,
      showHeader: true,
      showCheckbox: true,
      tableSize: "default",
      // batch delete
      delSeletion: []
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
    addPayee() {},
    check(index) {
      let self = this;
      if (self.payeeData[index].state == "未提交审核") {
        api.check(url.receipt_checkURL, self.payeeData[index].id).then(res => {
          if (res == 1) {
            self.$Message.success("提交成功！待总经理审核！");
            self.payeeData[index].state = "待审核";
          }
        });
      } else {
        this.$Message.warning("已提交审核，待经理审核！");
      }
    },
    batchSelect(selection, row) {
      this.delSeletion = selection;
    },
    batchDelete() {
      let id = [];
      for (let i = 0; i < this.delSeletion.length; i++) {
        id[i] = this.delSeletion[i].id;
      }
      api.batchDelete(url.receipt_delURL, id).then(res => {
        if (res != null) {
          this.initData(this.currentPage);
          this.$Message.info("删除成功！");
        }
      });
    },
    // page
    changePage(val) {
      this.initData(val);
    },
    // get init data
    initData(skip) {
      api.initData(url.receipt_getURL, skip).then(res => {
        this.payeeData = res[0];
        this.dataLength = res[1];
      });
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
@import url("../css/finance.css");
</style>
