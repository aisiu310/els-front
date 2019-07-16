<template>
  <div>
    <div class="top">
      <div class="word">出库单</div>
      <div class="middle">
        <DatePicker
          type="daterange"
          placement="bottom-end"
          placeholder="搜索时间段内的出库单"
          style="width: 200px"
          :clearable="true"
          @on-change="selectDate"
        ></DatePicker>
      </div>
      <div class="button">
        <Button type="success" @click="modal = true">新建</Button>
        <!-- new create out_warehouse modal -->
        <Modal title="新建入库单" v-model="modal" :styles="{top: '20px'}" :footer-hide="true">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="快递单号" prop="orderCode">
              <Input v-model="formValidate.orderCode" placeholder="请输入快递单号"></Input>
            </FormItem>
            <FormItem label="出库日期">
              <Row>
                <Col span="11">
                  <FormItem prop="outDate">
                    <DatePicker type="date" placeholder="选择出库日期" v-model="formValidate.outDate"></DatePicker>
                  </FormItem>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="目的地" prop="destination">
              <Input v-model="formValidate.destination" placeholder="请输入目的地"></Input>
            </FormItem>
            <FormItem label="装运形式" prop="loadingType">
              <Select v-model="formValidate.loadingType" placeholder="选择装运方式">
                <Option value="飞机">飞机</Option>
                <Option value="火车">火车</Option>
                <Option value="汽车">汽车</Option>
              </Select>
            </FormItem>
            <FormItem label="中转单编号" prop="tranferId">
              <Input v-model="formValidate.tranferId" type="number" placeholder="请输入中转单编号"></Input>
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
      ></Table>
    </div>
    <div class="page">
      <Page :total="dataLength" show-elevator @on-change="changePage" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modal: false,
      dataLength: 0,
      delSelection: [],
      // out_warehouse data
      in_warehouse_data: [
        {
          id: 12312132,
          orderCode: 1212312356,
          outDate: "2016-10-03",
          destination: "南京",
          loadingType: "汽车",
          tranferId: 11231212323,
          state: "待审核"
        },
        {
          id: 12312132,
          orderCode: 1212312356,
          outDate: "2016-10-03",
          destination: "南京",
          loadingType: "汽车",
          tranferId: 11231212323,
          state: "待审核"
        },
        {
          id: 12312132,
          orderCode: 1212312356,
          outDate: "2016-10-03",
          destination: "南京",
          loadingType: "汽车",
          tranferId: 11231212323,
          state: "待审核"
        },
        {
          id: 12312132,
          orderCode: 1212312356,
          outDate: "2016-10-03",
          destination: "南京",
          loadingType: "汽车",
          tranferId: 11231212323,
          state: "待审核"
        },
        {
          id: 12312132,
          orderCode: 1212312356,
          outDate: "2016-10-03",
          destination: "南京",
          loadingType: "汽车",
          tranferId: 11231212323,
          state: "待审核"
        },
        {
          id: 12312132,
          orderCode: 1212312356,
          outDate: "2016-10-03",
          destination: "南京",
          loadingType: "汽车",
          tranferId: 11231212323,
          state: "待审核"
        },
        {
          id: 12312132,
          orderCode: 1212312356,
          outDate: "2016-10-03",
          destination: "南京",
          loadingType: "汽车",
          tranferId: 11231212323,
          state: "待审核"
        },
        {
          id: 12312132,
          orderCode: 1212312356,
          outDate: "2016-10-03",
          destination: "南京",
          loadingType: "汽车",
          tranferId: 11231212323,
          state: "待审核"
        }
      ],
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
        outDate: new Date(),
        destination: "",
        loadingType: "",
        tranferId: ""
      },
      // new form rule for check
      ruleValidate: {
        orderCode: [
          {
            required: true,
            message: "订单号不能为空",
            trigger: "blur"
          }
        ],
        outDate: [
          {
            required: true,
            type: "date",
            message: "请输入日期",
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
        loadingType: [
          {
            required: true,
            message: "请选择装运方式",
            trigger: "blur"
          }
        ],
        tranferId: [
          {
            required: true,
            message: "中转单不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    // divide page
    changePage() {},
    // batch delete
    batchSelect(selection, row) {
      //   console.log(selection);
      //   console.log(row);
      this.delSelection = selection;
    },
    batchDelete() {
      console.log(this.delSelection);
    },
    selectDate(val) {
      alert(val);
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
        title: "出库日期",
        key: "outDate",
        sortable: true,
        width: 120
      });
      columns.push({
        title: "目的地",
        key: "destination",
        tooltip: true,
        sortable: true
      });
      columns.push({
        title: "装运形式",
        key: "loadingType",
        width: 120,
        filters: [
          { label: "飞机", value: "飞机" },
          { label: "火车", value: "火车" },
          { label: "汽车", value: "汽车" }
        ],
        filterMethod(value, row) {
          return row.loadingType.indexOf(value) > -1;
        }
      });
      columns.push({
        title: "中转单编号",
        key: "tranferId"
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

<style scoped>
@import url("../warehouse_css/common.css");
</style>
