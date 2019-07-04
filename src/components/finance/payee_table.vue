<template>
  <div>
    <Table
      :border="showBorder"
      :stripe="showStripe"
      :show-header="showHeader"
      :size="tableSize"
      :data="payeeData"
      :columns="tableColumns"
      @on-select="single"
    ></Table>

    <!-- page -->
    <div class="page">
      <Page :total="dataLength" show-elevator @on-change="changePage" />
    </div>
  </div>
</template>
<script>
import bus from '../reuse/bus'
export default {
  data() {
    return {
      payeeData: [],
      dataLength: 0,
      deleteData:[],
      showBorder: true,
      showStripe: true,
      showHeader: true,
      // showIndex: true,
      showCheckbox: true,
      tableSize: "default"
    };
  },
  mounted() {
    var tableData = [
      {
        id: "2019070304",
        code: "鼓楼区",
        date: "2019-07-04",
        money: "123",
        courier: "John Brown",
        orderList:
          "123456,1234567,12345678,123456,1234567,12345678,123456,1234567,12345678,123456,1234567,12345678,123456,1234567,12345678,123456,1234567,12345678",
        state: "待审核"
      },
      {
        id: "2019070304",
        code: "鼓楼区",
        date: "2019-07-04",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "待审核"
      },
      {
        id: "2019070301",
        code: "鼓楼区",
        date: "2019-07-01",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "待审核"
      },
      {
        id: "2019070301",
        code: "秦淮区",
        date: "2019-07-02",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "待审核"
      },
      {
        id: "2019070301",
        code: "雨花台区",
        date: "2019-06-29",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "未提交审核"
      },
      {
        id: "2019070301",
        code: "鼓楼区",
        date: "2019-06-25",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "未提交审核"
      },
      {
        id: "2019070301",
        code: "雨花台区",
        date: "2019-07-03",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "未提交审核"
      },
      {
        id: "2019070301",
        code: "秦淮区",
        date: "2019-07-02",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "未提交审核"
      },
      {
        id: "2019070301",
        code: "雨花台区",
        date: "2019-07-01",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "审核通过"
      },
      {
        id: "2019070301",
        code: "鼓楼区",
        date: "2019-07-03",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "审核通过"
      },
      {
        id: "2019070301",
        code: "鼓楼区",
        date: "2019-07-03",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "审核通过"
      },
      {
        id: "2019070301",
        code: "鼓楼区",
        date: "2019-07-03",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "审核通过"
      },
      {
        id: "2019070301",
        code: "鼓楼区",
        date: "2019-07-03",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "审核通过"
      },
      {
        id: "2019070301",
        code: "鼓楼区",
        date: "2019-07-03",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "审核不通过"
      },
      {
        id: "2019070301",
        code: "鼓楼区",
        date: "2019-07-03",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "审核不通过"
      },
      {
        id: "2019070301",
        code: "鼓楼区",
        date: "2019-07-03",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "审核不通过"
      },
      {
        id: "2019070301",
        code: "鼓楼区",
        date: "2019-07-03",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "审核不通过"
      },
      {
        id: "2019070301",
        code: "鼓楼区",
        date: "2019-07-03",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "未提交审核"
      },
      {
        id: "2019070301",
        code: "鼓楼区",
        date: "2019-07-03",
        money: "123",
        courier: "John Brown",
        orderList: "123456,1234567,12345678",
        state: "审核不通过"
      }
    ];

    this.dataLength = tableData.length;
    this.payeeData = tableData.slice(0, 10);
  },
  methods: {
    changePage(val) {
      // invoke the back-end API limit 10
      // 后端分页查询
      var tableData = [
        {
          id: "2019070304",
          code: "鼓楼区",
          date: "2019-07-04",
          money: "123",
          courier: "John Brown",
          orderList: "123456,1234567,12345678",
          state: "待审核"
        },
        {
          id: "2019070304",
          code: "鼓楼区",
          date: "2019-07-04",
          money: "123",
          courier: "John Brown",
          orderList: "123456,1234567,12345678",
          state: "待审核"
        },
        {
          id: "2019070301",
          code: "鼓楼区",
          date: "2019-07-01",
          money: "123",
          courier: "John Brown",
          orderList: "123456,1234567,12345678",
          state: "待审核"
        },
        {
          id: "2019070301",
          code: "秦淮区",
          date: "2019-07-02",
          money: "123",
          courier: "John Brown",
          orderList: "123456,1234567,12345678",
          state: "待审核"
        },
        {
          id: "2019070301",
          code: "雨花台区",
          date: "2019-06-29",
          money: "123",
          courier: "John Brown",
          orderList: "123456,1234567,12345678",
          state: "未提交审核"
        },
        {
          id: "2019070301",
          code: "鼓楼区",
          date: "2019-06-25",
          money: "123",
          courier: "John Brown",
          orderList: "123456,1234567,12345678",
          state: "未提交审核"
        },
        {
          id: "2019070301",
          code: "雨花台区",
          date: "2019-07-03",
          money: "123",
          courier: "John Brown",
          orderList: "123456,1234567,12345678",
          state: "未提交审核"
        },
        {
          id: "2019070301",
          code: "秦淮区",
          date: "2019-07-02",
          money: "123",
          courier: "John Brown",
          orderList: "123456,1234567,12345678",
          state: "未提交审核"
        },
        {
          id: "2019070301",
          code: "雨花台区",
          date: "2019-07-01",
          money: "123",
          courier: "John Brown",
          orderList: "123456,1234567,12345678",
          state: "审核通过"
        },
        {
          id: "2019070301",
          code: "鼓楼区",
          date: "2019-07-03",
          money: "123",
          courier: "John Brown",
          orderList: "123456,1234567,12345678",
          state: "审核通过"
        },
        {
          id: "2019070301",
          code: "鼓楼区",
          date: "2019-07-03",
          money: "123",
          courier: "John Brown",
          orderList: "123456,1234567,12345678",
          state: "审核通过"
        },
        {
          id: "2019070301",
          code: "鼓楼区",
          date: "2019-07-03",
          money: "123",
          courier: "John Brown",
          orderList: "123456,1234567,12345678",
          state: "审核通过"
        },
        {
          id: "2019070301",
          code: "鼓楼区",
          date: "2019-07-03",
          money: "123",
          courier: "John Brown",
          orderList: "123456,1234567,12345678",
          state: "审核通过"
        },
        {
          id: "2019070301",
          code: "鼓楼区",
          date: "2019-07-03",
          money: "123",
          courier: "John Brown",
          orderList: "123456,1234567,12345678",
          state: "审核不通过"
        },
        {
          id: "2019070301",
          code: "鼓楼区",
          date: "2019-07-03",
          money: "123",
          courier: "John Brown",
          orderList: "123456,1234567,12345678",
          state: "审核不通过"
        },
        {
          id: "2019070301",
          code: "鼓楼区",
          date: "2019-07-03",
          money: "123",
          courier: "John Brown",
          orderList: "123456,1234567,12345678",
          state: "审核不通过"
        },
        {
          id: "2019070301",
          code: "鼓楼区",
          date: "2019-07-03",
          money: "123",
          courier: "John Brown",
          orderList: "123456,1234567,12345678",
          state: "审核不通过"
        },
        {
          id: "2019070301",
          code: "鼓楼区",
          date: "2019-07-03",
          money: "123",
          courier: "John Brown",
          orderList: "123456,1234567,12345678",
          state: "未提交审核"
        },
        {
          id: "2019070301",
          code: "鼓楼区",
          date: "2019-07-03",
          money: "123",
          courier: "John Brown",
          orderList: "123456,1234567,12345678",
          state: "审核不通过"
        }
      ];
      this.payeeData = tableData.slice((val - 1) * 10, val * 10);
    },
    single(val,obj) {
      this.deleteData = obj.id;
      bus.$emit('del_id', obj.id);
      console.log(this.deleteData);
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

