<template>
  <div>
    <Table stripe border :columns="columns" :data="data" @on-selection-change="select" :key="index"></Table>
    <div style="margin:10px;float:left;">
      <Button type="success" v-bind="sel" @click="receiptListSubmitForCheck(sel)">提交审核</Button>
    </div>
    <div style="margin:10px;float:right;">
      <Page
        :total="sum"
        @on-change="changePage"
        @on-page-size-change="changePageSize"
        show-sizer
        :courent="currentPage"
        :page-size="pageSize"
        show-elevator
        show-total
      ></Page>
    </div>
  </div>
</template>
<script>
import { api } from "./api";
import { log, error } from "util";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      sum: 0,
      sel: [],
      data: [],
      index: -1, // 当前聚焦的输入框的行数
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
          title: "收款单编号",
          slot: "code"
        },
        {
          title: "日期",
          slot: "time"
        },
        {
          title: "金额",
          slot: "money"
        },
        {
          title: "快递员编号",
          slot: "courierId"
        },
        {
          title: "快递员姓名",
          slot: "courierName"
        },
        {
          title: "快递单集合",
          slot: "orderList"
        },
        {
          title: "审核状态",
          slot: "state"
        }
      ]
    };
  },
  mounted() {
    // this.getReceiptList(this.currentPage, this.pageSize);
  },
  methods: {
    getReceiptList(currentPage, pageSize) {
      let self = this;
      api
        .getReceiptList(currentPage, pageSize)
        .then(response => {
          if (response.data.status === 200) {
            self.data = response.data.data[0];
            self.sum = response.data.data[1];
            self.$Message.success("加载成功");
          }
        })
        .catch(error => {
          self.$Message.error("请求超时,请检查链接信息");
        });
    },
    select(selection, row) {
      this.sel = selection;
    },
    receiptListSubmitForCheck(sel) {
      const self = this;
      var list = [];
      if (sel.length > 0) {
        sel.forEach(element => {
          if (element.state === 0) {
            list.push(element.id);
          }
        });
        api
          .receiptListSubmitForCheck(list)
          .then(response => {
            if (response.data.status === 200) {
              self.getReceiptList(self.currentPage, self.pageSize);
              self.$Message.success("提交成功");
            } else {
              self.$Message.error("提交失败");
            }
          })
          .catch(function(error) {
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
      console.log(page);
      this.getReceiptList(page, this.pageSize);
    },
    changePageSize(pageSize) {
      this.getReceiptList(this.currentPage, pageSize);
    }
  }
};
</script>
