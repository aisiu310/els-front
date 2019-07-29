<template>
  <div>
    <Tabs>
      <TabPane label="派件单" icon="ios-paper-plane">
        <Table stripe border :columns="columns" :data="data" @on-selection-change="select"></Table>
        <div id="submit_for_check">
          <Button type="success" v-bind="sel" @click="submitforcheck(sel)">提交审核</Button>
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
          key: sessionStorage.getItem("hallCode")
        },
        {
          title: "订单条形码号",
          key: "allOrderCode"
        },
        {
          title: "快递员编号",
          key: sessionStorage.getItem("courierId")
        },
        {
          title: "快递员",
          key: sessionStorage.getItem("courierName")
        },
        {
          title: "派件状态",
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
          console.log(response.data);
          if (response.data.status === 200) {
            self.data = response.data.data;
          } else {
            self.$Message.error(response.data.msg);
          }
        })
        .catch(error => {
          self.$Message.error("请求超时");
        });
    },
    select(selection, row) {
      this.sel = selection;
    },
    submitforcheck(sel) {
      const self = this;
      if (sel.length > 0) {
        api
          .submitSenderListForCheck(sel)
          .then(response => {
            console.log(response);
            if (response.data.status === 200) {
              self.getSenderList(this.currentPage, this.pageSize);
              self.$Message.success("审核成功");
            } else {
              self.$Message.error(response.data.msg);
            }
          })
          .catch(error => {
            console.log(error);
            self.$Message.error("请求超时,请检查连接信息");
          });
      } else {
        self.$Message.error("你还没有选择");
      }
    },
    cancle() {
      this.$Message.info("取消操作");
    },
    changePage(page) {
      this.getSenderList(page, this.pageSize);
    }
  }
};
</script>
<style>
#submit_for_check {
  margin: 10px;
  width: auto;
  height: auto;
  float: left;
}
</style>
