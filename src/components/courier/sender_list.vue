<template>
  <div>
    <Tabs>
      <TabPane label="装车单" icon="ios-paper-plane">
        <Table stripe border :columns="columns" :data="data"></Table>

        <div id="arrive_list_add">
          <Button type="primary" @click="modal = true">添加</Button>
          <Modal
            v-model="modal"
            title="添加"
            v-bind="formItem"
            @on-ok="submitSenderList(formItem)"
            @on-cancle="cancle"
          >
            <Form ref="formItem" :model="formItem" :label-width="80" :rules="ruleValidate">
              <FormItem label="收件人姓名" prop="code">
                <Input v-model="formItem.trueAddresseeName" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="收件人電話" prop="transportationId">
                <Input v-model="formItem.addresseePhone" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="接收日期" prop="receiptDate">
                <Input v-model="formItem.receiptDate" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="條形碼編號" prop="code">
                <Input v-model="formItem.code" placeholder="Enter something..."></Input>
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
      currentPage: 1,
      pageSize: 10,
      formItem: {
        trueAddresseeName: "",
        addresseePhone: "",
        receiptDate: "",
        code: ""
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
          title: "收件人姓名",
          key: "trueAddresseeName"
        },
        {
          title: "收件人手机号",
          key: "addresseePhone"
        },
        {
          title: "收件日期",
          key: "receiptDate"
        },
        {
          title: "订单条形码号",
          key: "code"
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
          if (response.data.status === 200) {
            self.data = response.data.data[0];
            self.sum = response.data.data[1];
          }
        })
        .catch(error => {
          self.$Message.error("请求超时");
        });
    },
    select(selection, row) {
      this.sel = selection;
    },
    submitSenderList(formItem) {
      const self = this;
      self.$refs["formItem"].validate(valid => {
        if (valid) {
          api
            .submitSenderList(formItem)
            .then(response => {
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
        } else {
          self.modal = "true";
          self.$Message.error("操作失败");
        }
      });
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
