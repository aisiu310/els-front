<template>
  <div>
    <Table stripe border :columns="columns" :data="data" @on-selection-change="select" :key="index">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="success" v-bind="sel" @click="receiptListSubmitForCheck(sel)">提交审核</Button>
      </template>
    </Table>
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
          title: "收款单机构",
          key: "code"
        },
        {
          title: "日期",
          key: "time"
        },
        {
          title: "金额",
          key: "money"
        },
        {
          title: "快递员编号",
          key: "courierId"
        },
        {
          title: "快递员姓名",
          key: "courierName"
        },
        {
          title: "快递单集合",
          key: "orderList"
        },
        {
          title: "审核状态",
          key: "state"
        },
        {
          title: "操作",
          slot: "action"
        }
      ]
    };
  },
  mounted() {
    this.getReceiptList(this.currentPage, this.pageSize);
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

      if ((sel.length = 1)) {
        console.log(sel[0].id);
        let id = sel[0].id;
        api
          .receiptListSubmitForCheck(id)
          .then(response => {
            console.log(response);
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
        self.$Message.error("每次只能提交一条记录");
      }
    },
    cancle() {
      this.$Message.info("取消操作");
    },
    changePage(page) {
      this.getReceiptList(page, this.pageSize);
    },
    changePageSize(pageSize) {
      this.getReceiptList(this.currentPage, pageSize);
    }
  }
};
</script>
