<template>
  <div>
    <Tabs>
      <TabPane label="揽件单" icon="ios-paper-plane">
        <Table stripe border :columns="columns" :data="data" @on-selection-change="select"></Table>

        <div id="submit_for_check">
          <Button type="success" v-bind="sel" @click="submitCollectList(sel)">揽件</Button>
        </div>

        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
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
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import { api } from "./api";
import qs from "qs";
import { linkSync, link } from "fs";
import { error } from "util";
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
          title: "id",
          key: "id"
        },
        {
          title: "货物数量",
          key: "goodsCount",
          sortable: true
        },
        {
          title: "货物总重量",
          key: "goodsWeight",
          sortable: true
        },
        {
          title: "货物体积",
          key: "goodsVolume",
          sortable: true
        },
        {
          title: "收件日期",
          key: "receiptDate",
          sortable: true
        },
        {
          title: "收件人所属区域",
          key: "addresseeRegion",
          sortable: true
        },
        {
          title: "收件人姓名",
          key: "addresseeName"
        },
        {
          title: "收件人手机号",
          key: "addresseePhone"
        },

        {
          title: "收件人详细住址",
          key: "addresseeDetailAddress"
        },
        {
          title: "实际收件人姓名",
          key: "trueAddresseeName"
        },
        {
          title: "寄件人编号",
          key: "senderId"
        }
      ]
    };
  },
  mounted() {
    this.getCollectList(this.currentPage, this.pageSize);
  },
  methods: {
    getCollectList(currentPage, pageSize) {
      const self = this;
      api
        .getCollectList(currentPage, pageSize)
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
    submitCollectList(sel) {
      const self = this;
      if (sel.length > 0) {
        api
          .submitCollectList(sel)
          .then(response => {
            if (response.data.status === 200) {
              this.getCollectList(this.currentPage, this.pageSize);
              this.$Message.success("提交成功");
            } else {
              this.$Message.error("提交失败");
            }
          })
          .catch(error => {
            self.$Message.error("请求超时,请检查连接信息");
          });
      } else {
        this.$Message.error("你还没有选择");
      }
    },
    changePage(page) {
      // this.currentPage = val;
      this.getCollectList(page, this.pageSize);
    },
    changePageSize(pageSize) {
      // console.log(pageSize);
      this.getCollectList(this.currentPage, pageSize);
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
