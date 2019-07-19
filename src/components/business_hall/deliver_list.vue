<template>
  <div>
    <Tabs>
      <TabPane label="派件管理" icon="ios-swap">
        <Table stripe border :columns="columns" :data="data" @on-selection-change="select">
          <template slot-scope="{row,index}" hidden slot="id">
            <span>{{row.id}}</span>
          </template>
          <template slot-scope="{row,index}" slot="code">
            <input type="text" v-model="editItem.code" v-if="editIndex === index" />
            <span v-else>{{row.code}}</span>
          </template>
          <template slot-scope="{row,index}" slot="deliverDate">
            <input type="text" v-model="editItem.deliverDate" v-if="editIndex === index" />
            <span v-else>{{row.deliverDate}}</span>
          </template>
          <template slot-scope="{row,index}" slot="allOrderCode">
            <input type="text" v-model="editItem.allOrderCode" v-if="editIndex === index" />
            <span v-else>{{row.allOrderCode}}</span>
          </template>
          <template slot-scope="{row,index}" slot="courierId">
            <input type="text" v-model="editItem.courierId" v-if="editIndex === index" />
            <span v-else>{{row.courierId}}</span>
          </template>
          <template slot-scope="{row,index}" slot="courier">
            <input type="text" v-model="editItem.courier" v-if="editIndex === index" />
            <span v-else>{{row.courier}}</span>
          </template>
          <template slot-scope="{row,index}" slot="state">
            <span>{{row.state}}</span>
          </template>
          <template slot-scope="{ row }" slot="date">
            <strong>{{ row.date }}</strong>
          </template>
          <template slot-scope="{row,index}" slot="action">
            <div v-if="editIndex === index">
              <Button v-bind="editItem" @click="handleSave(editItem)">save</Button>
              <Button @click="editIndex = -1">cancel</Button>
            </div>
            <div v-else>
              <Button @click="handleEdit(row,index)">操作</Button>
            </div>
          </template>
        </Table>
        <div id="submit_for_check">
          <Button type="success" v-bind="sel" @click="deliverListSubmitForCheck(sel)">提交审核</Button>
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
        <h1>等待程序员小哥开发</h1>
      </TabPane>
    </Tabs>
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
      sel: [],
      data: [],
      editIndex: -1, // 当前聚焦的输入框的行数
      editItem: {
        id: "",
        code: "",
        deliverDate: "",
        allOrderCode: "",
        courierId: "",
        courier: ""
      },
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
          slot: "code"
        },
        {
          title: "派送日期",
          slot: "deliverDate"
        },
        {
          title: "所有订单条形码号",
          slot: "allOrderCode"
        },
        {
          title: "快递员编号",
          slot: "courierId"
        },
        {
          title: "快递员",
          slot: "courier"
        },
        {
          title: "审核状态",
          slot: "state"
        },
        {
          title: "操作",
          slot: "action"
        }
      ]
    };
  },
  mounted() {
    this.getdeliverlist(this.currentPage, this.pageSize);
  },
  methods: {
    getdeliverlist(currentPage, pageSize) {
      let self = this;
      api
        .getdeliverlist(currentPage, pageSize)
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
    handleEdit(row, index) {
      this.editItem.id = row.id;
      this.editItem.code = row.code;
      this.editItem.deliverDate = row.deliverDate;
      this.editItem.allOrderCode = row.allOrderCode;
      this.editItem.courierId = row.courierId;
      this.editItem.courier = row.courier;
      this.editIndex = index;
    },
    handleSave(editItem) {
      let self = this;
      api
        .deliverListSave(editItem)
        .then(response => {
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
    deliverListSubmitForCheck(sel) {
      const self = this;
      var list = [];
      if (sel.length > 0) {
        sel.forEach(element => {
          if (element.state === 0) {
            list.push(element.id);
          }
        });
        api
          .deliverListSubmitForCheck(list)
          .then(response => {
            if (response.data.status === 200) {
              self.getdeliverlist(self.currentPage, self.pageSize);
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
      // this.currentPage = val;
      this.getdeliverlist(page, this.pageSize);
    },
    changePageSize(pageSize) {
      // console.log(pageSize);
      this.getdeliverlist(this.currentPage, pageSize);
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
</style>