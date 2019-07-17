<template>
  <div>
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
export default {
  data() {
    return {
      modal: false,
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
          this.$axios
            .post(
              "http://localhost:8031/inInventory/addInInventory",
              self.formValidate
            )
            .then(res => {
              if (res.data.data == 1) {
                self.modal = false;
                self.$Message.success("新建成功");
                self.initData(self.currentPage);
              }
            })
            .catch(error => {
              self.$Message.error("网络超时");
            });
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    // divide page
    changePage(page) {
      this.initData(page);
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
      this.$axios
        .delete("http://localhost:8031/inInventory/batchDelete", { data: id })
        .then(res => {
          if (res.data.data <= 0) {
            this.$Message.warning("删除失败！");
          } else {
            this.initData(this.currentPage);
            this.$Message.warning("删除成功！");
          }
        });
    },
    //search data by date
    selectDate(val) {
      alert(val);
    },
    // get data from db
    initData(val) {
      let self = this;
      self.$axios
        .get(
          "http://localhost:8031/inInventory/getInInventory?skipCount=" + val
        )
        .then(res => {
          self.in_warehouse_data = res.data.data[0];
          self.dataLength = res.data.data[1];
        });
    },
    // submit to check
    check(index) {
      if (this.in_warehouse_data[index].state == "未提交审核") {
        let self = this;
        this.$axios
          .get("http://localhost:8031/inInventory/checkInInventory", {
            params: {
              state: "待审核",
              id: self.in_warehouse_data[index].id
            }
          })
          .then(res => {
            if (res.data.data == 1) {
              self.$Message.success("提交成功，待经理审核！");
              self.in_warehouse_data[index].state = "待审核";
            }
          });
      } else {
        this.$Message.warning("已经提交，待经理审核");
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

