<template>
  <div>
    <Tabs>
      <TabPane label="派件单" icon="ios-paper-plane">
        <Table stripe border :columns="columns" :data="data"></Table>

        <div id="arrive_list_add">
          <Button type="primary" @click="modal = true">添加</Button>
          <Modal
            v-model="modal"
            title="添加"
            v-bind="formItem"
            @on-ok="submitform(formItem)"
            @on-cancle="cancle"
          >
            <Form ref="formItem" :model="formItem" :label-width="80" :rules="ruleValidate">
              <FormItem label="营业厅编号" prop="code">
                <Input v-model="formItem.code" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="派送日期" prop="deliverDate">
                <Input v-model="formItem.deliverDate" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="订单条形码编号" prop="allOrderCode">
                <Input v-model="formItem.allOrderCode" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="快递员编号" prop="courierId">
                <Input v-model="formItem.courierId" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="快递员" prop="courier">
                <Input v-model="formItem.courier" placeholder="Enter something..."></Input>
              </FormItem>
            </Form>
          </Modal>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import { api } from "./api";
export default {
  data() {
    return {
      modal: false,
      currentPage: 1,
      pageSize: 10,
      formItem: {
        code: "025000",
        deliverDate: "2019-07-20",
        allOrderCode: "15476125",
        courierId: "12123",
        courier: "褚岩"
      },
      ruleValidate: {},
      sel: [],
      data: [],
      sum: 0,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "营业厅编号",
          key: "code"
        },
        {
          title: "派送日期",
          key: "deliverDate"
        },
        {
          title: "订单条形码号",
          key: "allOrderCode"
        },
        {
          title: "快递员编号",
          key: "courierId"
        },
        {
          title: "快递员",
          key: "courier"
        },
        {
          title: "状态",
          key: "state"
        }
      ]
    };
  },
  mounted() {
    this.getSenderList(this.currentPage, this.pageSize);
  },
  methods: {
    getSenderList(currentPage, pageSize) {
      const self = this;
      api
        .getSenderList(currentPage, pageSize)
        .then(response => {
          console.log(response);
          if (response.data.status === 200) {
            self.data = response.data.data.list;
            self.sum = response.data.data.total;
          }
        })
        .catch(error => {
          self.$Message.error("请求超时");
        });
    },
    select(selection, row) {
      this.sel = selection;
    },
    submitform(formItem) {
      const self = this;
      // self.$refs["formItem"].validate(valid => {
      //   if (valid) {
      api
        .submitSenderList(formItem)
        .then(response => {
          console.log(response);
          if (response.data.status === 200) {
            self.$Message.success("添加成功");
            self.getSenderList(this.currentPage, this.pageSize);
          } else {
            self.$Message.warning(response.data.msg);
          }
        })
        .catch(error => {
          self.$Message.error("请求超时,请检查连接信息");
        });
      // } else {
      //   self.modal = "true";
      //   self.$Message.error("操作失败");
      //   }
      // });
    },
    cancle() {
      this.$Message.info("取消操作");
    },
    changePage(page) {
      // this.currentPage = val;
      this.getLoadCarList(page, this.pageSize);
    },
    changePageSize(pageSize) {
      // console.log(pageSize);
      this.getLoadCarList(this.currentPage, pageSize);
    }
  }
};
</script>
<style>
#delete_button {
  margin: 10px;
  float: left;
}
#arrive_list_add {
  border: 0px solid rebeccapurple;
  margin: 10px;
  width: auto;
  height: auto;
  float: left;
}
#submit_for_check {
  margin: 10px;
  width: auto;
  height: auto;
  float: left;
}
</style>
