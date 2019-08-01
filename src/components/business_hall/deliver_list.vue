<template>
  <div>
    <Tabs>
      <TabPane label="派件管理" icon="ios-swap">
        <Table stripe border :columns="columns" :data="data" @on-selection-change="select">
          <!-- <template slot-scope="{row,index}" slot="action">
            <div v-if="editIndex === index">
              <Button v-bind="editItem" @click="handleSave(editItem)">保存</Button>
              <Button @click="editIndex = -1">取消</Button>
            </div>
            <div v-else>
              <Button @click="handleEdit(row,index)">修改</Button>
            </div>
          </template>-->
        </Table>
        <div id="submit_for_check">
          <Button type="primary" @click="addDeliverlist()">生成派件单</Button>
        </div>
        <div id="submit_for_check">
          <Button type="success" @click="savelist()">存储派件单</Button>
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
      <TabPane label="历史记录" icon="ios-clock-outline">
        <img src="../../assets/B_G.png" width="100%" height="660px" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import { api } from "./api";
import { log, error } from "util";
import { resolve } from "url";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      showTime: "",
      sel: [],
      data: [],
      temp: [],
      valueData: [],
      keyData: [],
      sum: 0,
      columns: [
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
          title: "所有订单条形码号",
          key: "allOrderCode"
        },
        {
          title: "快递员编号",
          key: "courierId"
        }
      ]
    };
  },
  mounted() {
    this.getdeliverlist(this.currentPage, this.pageSize);
  },
  methods: {
    //查询派件单~自测成功
    getdeliverlist(currentPage, pageSize) {
      let self = this;
      api
        .getdeliverlist(currentPage, pageSize)
        .then(response => {
          console.log(response);
          if (response.data.status === 200) {
            self.data = response.data.data.list;
            self.sum = response.data.data.total;
          } else {
            self.$Message.error(response.data.data.msg);
          }
        })
        .catch(error => {
          self.$Message.error("请求超时,请检查链接信息1");
        });
    },
    addDeliverlist() {
      let self = this;
      api.addDeliverlist().then(response => {
        console.log(response);
        if (response.data.status === 200) {
          let tempData = response.data.data;
          let key = Object.keys(tempData); // get key
          let tempShowData = [];
          for (let i = 0; i < key.length; i++) {
            let all = "";
            for (let j = i; j < i + 1; j++) {
              all = tempData[key[j]] + all;
            }
            tempShowData[i] = {
              code: sessionStorage.getItem("hallCode"),
              allOrderCode: all,
              courierId: key[i]
            };
            console.log(tempShowData[0]);
            this.data = tempShowData;
          }
          self.$Message.success("分配成功");
        } else {
          self.$Message.error("分配失败");
        }
      });
    },
    handleEdit(row, index) {
      this.editItem.id = row.id;
      this.editItem.code = row.code;
      this.editItem.deliverDate = row.deliverDate;
      this.editItem.allOrderCode = row.allOrderCode;
      this.editItem.courierId = row.courierId;
      this.editItem.courier = row.courier;
      this.editIndex = index;
    },
    //修改派件单~自测成功
    handleSave(editItem) {
      let self = this;
      api
        .deliverListSave(editItem)
        .then(response => {
          console.log(response);
          if (response.data.status === 200) {
            self.getdeliverlist(self.currentPage, self.pageSize);
            self.$Message.success("修改成功");
          } else {
            self.$Message.error("提交失败");
          }
        })
        .catch(error => {
          self.$Message.error("请求超时,请检查连接信息");
        });
      this.editIndex = -1;
    },
    select(selection, row) {
      this.sel = selection;
    },
    //派件单提交审核
    savelist() {
      const self = this;
      // let alldata = [];
      // alldata.push(self.time);
      // alldata.push(self.data);
      console.log(this.data);
      api
        .deliverListSave(this.data)
        .then(response => {
          console.log(response);
          if (response.data.status === 200) {
            self.$Message.success("提交成功");
          } else {
            self.$Message.error("提交失败");
          }
        })
        .catch(function(error) {
          self.$Message.error("请求超时,请检查连接信息");
        });
    },
    cancle() {
      this.$Message.info("取消操作");
    },
    changePage(page) {
      this.getdeliverlist(page, this.pageSize);
    },
    changePageSize(pageSize) {
      this.getdeliverlist(this.currentPage, pageSize);
    }
  }
};
</script>
<style>
#submit_for_check {
  border: 0px solid rebeccapurple;
  margin: 10px;
  width: auto;
  height: auto;
  float: left;
}
</style>