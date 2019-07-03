<template>
  <div>
    <Table
      :border="showBorder"
      :stripe="showStripe"
      :show-header="showHeader"
      :size="tableSize"
      :data="tableData"
      :columns="tableColumns"
    ></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="100" :current="1" @on-change="changePage"></Page>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: "2019070301",
          code: "鼓楼区",
          date: "2019-07-01",
          money: "123",
          courier: "John Brown",
          orderList: "123456,1234567,12345678"
        },
        {
          id: "2019070301",
          code: "秦淮区",
          date: "2019-07-02",
          money: "123",
          courier: "John Brown",
          orderList: "123456,1234567,12345678"
        },
        {
          id: "2019070301",
          code: "雨花台区",
          date: "2019-06-29",
          money: "123",
          courier: "John Brown",
          orderList: "123456,1234567,12345678"
        },
        {
          id: "2019070301",
          code: "鼓楼区",
          date: "2019-06-25",
          money: "123",
          courier: "John Brown",
          orderList: "123456,1234567,12345678"
        },
        {
          id: "2019070301",
          code: "雨花台区",
          date: "2019-07-03",
          money: "123",
          courier: "John Brown",
          orderList: "123456,1234567,12345678"
        },
        {
          id: "2019070301",
          code: "秦淮区",
          date: "2019-07-02",
          money: "123",
          courier: "John Brown",
          orderList: "123456,1234567,12345678"
        },
        {
          id: "2019070301",
          code: "雨花台区",
          date: "2019-07-01",
          money: "123",
          courier: "John Brown",
          orderList: "123456,1234567,12345678"
        },
        {
          id: "2019070301",
          code: "鼓楼区",
          date: "2019-07-03",
          money: "123",
          courier: "John Brown",
          orderList: "123456,1234567,12345678"
        }
      ],
      showBorder: true,
      showStripe: true,
      showHeader: true,
      showIndex: true,
      showCheckbox: true,
      tableSize: "default"
    };
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
          console.log(value);
          return row.code.indexOf(value) > -1;
        }
      });
      columns.push({
        title: "Date",
        key: "date",
        sortable: true
      });
      columns.push({
        title: "收款金额",
        key: "money"
      });
      columns.push({
        title: "收款快递员 ",
        key: "courier"
      });
      columns.push({
        title: "所有收款订单号",
        key: "orderList"
      });
      return columns;
    },
    methods: {
      changePage() {
        // invoke the back-end API limit 8
        
      }
    }
  }
};
</script>
