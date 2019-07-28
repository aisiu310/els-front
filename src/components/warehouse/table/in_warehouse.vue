<template>
  <div class="body">
    <div class="top">
      <div class="word">入库单</div>
      <div class="middle">
        <DatePicker
          type="daterange"
          placement="bottom-end"
          placeholder="搜索时间段内的出库单"
          style="width: 300px"
          :clearable="true"
          @on-change="selectDate"
        ></DatePicker>
      </div>
      <div class="button">
        <Button type="success" @click="modal = true">新建</Button>
        <!-- new create in_warehouse modal -->
        <Modal title="新建入库单" v-model="modal" :styles="{top: '20px'}" :footer-hide="true">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="快递单号" prop="orderCode">
              <Input v-model="formValidate.orderCode" placeholder="请输入快递单号" type="number" max="10"></Input>
            </FormItem>
            <FormItem label="入库日期">
              <Row>
                <Col span="11">
                  <FormItem prop="inDate">
                    <DatePicker type="date" placeholder="选择入库日期" v-model="formValidate.inDate"></DatePicker>
                  </FormItem>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="目的地" prop="destination">
              <Input v-model="formValidate.destination" placeholder="请输入目的地"></Input>
            </FormItem>
            <FormItem label="区域" prop="area">
              <Select v-model="formValidate.area" placeholder="请选择仓库区域">
                <Option value="航运区">航运区</Option>
                <Option value="铁运区">铁运区</Option>
                <Option value="汽运区">汽运区</Option>
                <Option value="机动区">机动区</Option>
              </Select>
            </FormItem>
            <FormItem label="架号" prop="frame">
              <Input v-model="formValidate.frame" type="number"></Input>
            </FormItem>
            <FormItem label="排号" prop="rowNumber">
              <Input v-model="formValidate.rowNumber" type="number"></Input>
            </FormItem>
            <FormItem label="位号" prop="status">
              <Input v-model="formValidate.status" type="number"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formValidate')">新建</Button>
              <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
          </Form>
        </Modal>

        <Button type="error" @click="batchDelete()">批量删除</Button>
      </div>
    </div>
    <hr />
    <div>
      <Table
        :border="showBorder"
        :stripe="showStripe"
        :show-header="showHeader"
        :size="tableSize"
        :data="in_warehouse_data"
        :columns="tableColumns"
        @on-select="batchSelect"
        @on-select-cancel="batchSelect"
        @on-select-all-cancel="batchSelect"
        @on-select-all="batchSelect"
      ></Table>
    </div>
    <div class="page">
      <Page :total="dataLength" :current="currentPage" show-elevator @on-change="changePage" />
    </div>
  </div>
</template>

<script>
import { api } from "../api/api";
import { url } from "../api/url";
export default {
  data() {
    return {
      modal: false,
      dateTime: [],
      dataLength: 0,
      currentPage: 1,
      delSelection: [],
      // in_warehouse data
      in_warehouse_data: [],
      // list for table
      showBorder: true,
      showStripe: true,
      showHeader: true,
      showIndex: true,
      showCheckbox: true,
      tableSize: "default",
      // new form data
      formValidate: {
        inventoryName: sessionStorage.getItem("organizationName"),
        orderCode: "",
        inDate: new Date(),
        destination: "",
        area: "",
        frame: "",
        rowNumber: "",
        status: ""
      },
      // new form rule for check
      ruleValidate: {
        orderCode: [
          {
            required: true,
            message: "订单编号不能为空",
            trigger: "blur"
          }
        ],
        inDate: [
          {
            required: true,
            message: "请选择日期",
            type: "date",
            trigger: "change"
          }
        ],
        destination: [
          {
            required: true,
            message: "目的地不能为空",
            trigger: "blur"
          }
        ],
        area: [
          {
            required: true,
            message: "请选择区域",
            trigger: "change"
          }
        ],
        frame: [
          {
            required: true,
            message: "请输入架号",
            trigger: "blur"
          }
        ],
        rowNumber: [
          {
            required: true,
            message: "请输入排号",
            trigger: "blur"
          }
        ],
        status: [
          {
            required: true,
            message: "请输入位号",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.initData(this.currentPage);
  },
  methods: {
    handleSubmit(name) {
      let self = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          api
            .addData(url.in_addURL, this.formValidate)
            .then(res => {
              if (res == 1) {
                this.initData(this.currentPage);
                this.$Message.success("新建成功！");
                this.modal = false;
              } else {
                this.$Message.success("新建失败！");
              }
            })
            .catch(error => {
              alert("服务器出错");
            });
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    // divide page
    changePage(page) {
      let flag = this.dateTime;
      if (flag == "," || flag.length == 0) {
        this.initData(page);
      } else {
        this.currentPage = page;
        this.getDataByTime(flag[0], flag[1]);
      }
    },
    //get this list of id in order to batch delete
    batchSelect(selection, row) {
      this.delSelection = selection;
    },
    //batch delete
    batchDelete() {
      var idList = this.delSelection;
      var id = [];
      for (var i = 0; i < idList.length; i++) {
        id[i] = idList[i].id;
      }
      api.batchDelete(url.in_delURL, id).then(res => {
        if (res <= 0) {
          this.$Message.warning("删除失败！");
        } else {
          this.initData(this.currentPage);
          this.$Message.warning("删除成功！");
        }
      });
    },
    //search data by date
    selectDate(val) {
      this.dateTime = val;
      if (val == ",") {
        this.initData(this.currentPage);
      } else {
        let begin = val[0];
        let end = val[1];
        this.getDataByTime(begin, end);
      }
    },
    // get data from db
    initData(val) {
      api.initData(url.in_getURL, val).then(res => {
        this.in_warehouse_data = res[0];
        this.dataLength = res[1];
      });
    },
    // submit to check
    check(index) {
      if (this.in_warehouse_data[index].state == "未提交审核") {
        api
          .checkData(url.in_checkURL, this.in_warehouse_data[index].id)
          .then(res => {
            if (res == 1) {
              this.initData(this.currentPage);
              this.$Message.success("提交成功，待经理审核");
            }
          });
      } else {
        this.$Message.warning("已经提交，待经理审核");
      }
    },
    // get data between time
    getDataByTime(begin, end) {
      api
        .getDataBetweenTime(url.in_getByTimeURL, begin, end, this.currentPage)
        .then(res => {
          if (res != null) {
            this.int_warehouse_data = res[0];
            this.dataLength = res[1];
          }
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
      columns.push({
        title: "快递单号",
        key: "orderCode",
        sortable: true
      });
      columns.push({
        title: "入库日期",
        key: "inDate",
        width: 150,
        sortable: true
      });
      columns.push({
        title: "目的地",
        key: "destination",
        tooltip: true,
        sortable: true
      });
      columns.push({
        title: "区域",
        key: "area",
        width: 100,
        sortable: true,
        filters: [
          { label: "航运区", value: "航运区" },
          { label: "铁运区", value: "铁运区" },
          { label: "汽运区", value: "汽运区" },
          { label: "机运区", value: "机运区" }
        ],
        filterMethod(value, row) {
          return row.area.indexOf(value) > -1;
        }
      });
      columns.push({
        title: "架号",
        key: "frame",
        width: 80,
        sortable: true
      });
      columns.push({
        title: "排号",
        key: "rowNumber",
        width: 80,
        sortable: true
      });
      columns.push({
        title: "位号",
        key: "status",
        width: 80,
        sortable: true
      });
      columns.push({
        title: "审核状态",
        key: "state",
        width: 120,
        filters: [
          { label: "未提交审核", value: "未提交审核" },
          { label: "待审核", value: "待审核" },
          { label: "审核通过", value: "审核通过" },
          { label: "审核不通过", value: "审核不通过" },
          { label: "已处理-", value: "已处理" }
        ],
        filterMethod(value, row) {
          return row.state.indexOf(value) > -1;
        }
      });
      columns.push({
        title: "操作",
        key: "action",
        width: 120,
        align: "center",
        render: (h, params) => {
          return h("div", [
            h(
              "Button",
              {
                props: {
                  type: "info",
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

<style scoped >
@import url("../warehouse_css/common.css");
</style>

