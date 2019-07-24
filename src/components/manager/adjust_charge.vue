<template>
  <div>
    <Tabs>
      <TabPane label="邮递收費策略" icon="ios-paper-plane">
        <div id="search">
          <Input search enter-button placeholder="请输入查詢信息，可以是姓名、工號等" />
        </div>
        <Table stripe border :columns="columns" :data="data" @on-selection-change="select">
          <template slot-scope="{row,index}" hidden slot="id">
            <span>{{row.id}}</span>
          </template>
          <template slot-scope="{row,index}" slot="StartPlace">
            <input type="text" v-model="editItem.StartPlace" v-if="editIndex === index" />
            <span v-else>{{row.StartPlace}}</span>
          </template>
          <template slot-scope="{row,index}" slot="EndPlace">
            <input type="text" v-model="editItem.EndPlace" v-if="editIndex === index" />
            <span v-else>{{row.EndPlace}}</span>
          </template>
          <template slot-scope="{row,index}" slot="distance">
            <input type="text" v-model="editItem.distance" v-if="editIndex === index" />
            <span v-else>{{row.distance}}</span>
          </template>
          <template slot-scope="{row,index}" slot="EconomyExpress">
            <input type="text" v-model="editItem.EconomyExpress" v-if="editIndex === index" />
            <span v-else>{{row.EconomyExpress}}</span>
          </template>
          <template slot-scope="{row,index}" slot="StandardExpress">
            <input
              type="text"
              v-model="editItem.StandardExpress"
              v-if="editItem.editIndex === index"
            />
            <span v-else>{{row.StandardExpress}}</span>
          </template>
          <template slot-scope="{row,index}" slot="express">
            <input type="text" v-model="editItem.express" v-if="editIndex === index" />
            <span v-else>{{row.express}}</span>
          </template>
          <template slot-scope="{ row }" slot="id">
            <strong>{{ row.date }}</strong>
          </template>
          <template slot-scope="{row,index}" slot="action">
            <div v-if="editIndex === index">
              <Button :v-bind="editItem" @click="handleSave(editItem)">保存</Button>
              <Button @click="editIndex = -1">取消</Button>
            </div>
            <div v-else>
              <Button @click="handleEdit(row,index)">修改</Button>
            </div>
          </template>
        </Table>

        <Button type="error" id="delete_button" @click="modaldelet = true">删除</Button>
        <Modal v-model="modaldelet" width="360">
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>删除确认</span>
          </p>
          <div style="text-align:center">
            <p>这些数据删除后无法恢复、你确定要删除吗？</p>
          </div>
          <div slot="footer">
            <Button
              type="error"
              :v-bind="sel"
              @click="remove(sel)"
              size="large"
              long
              :loading="modal_loading"
            >Delete</Button>
          </div>
        </Modal>

        <div id="arrive_list_add">
          <Button type="primary" @click="modal = true">添加</Button>
          <Modal
            v-model="modal"
            title="添加"
            v-bind="formItem"
            @on-ok="submitform('formItem')"
            @on-cancle="cancle"
          >
            <Form ref="formItem" :model="formItem" :label-width="80" :rules="ruleValidate">
              <FormItem label="起始地" prop="StartPlace">
                <Input v-model="formItem.StartPlace" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="目的地" prop="EndPlace">
                <Input v-model="formItem.EndPlace" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="距离" prop="distance">
                <Input v-model="formItem.distance" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="经济快递" prop="EconomyExpress">
                <Input v-model="formItem.EconomyExpress" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="标准快递" prop="StandardExpress">
                <Input v-model="formItem.StandardExpress" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="特快" prop="express">
                <Input v-model="formItem.express" placeholder="Enter something..."></Input>
              </FormItem>
            </Form>
          </Modal>
        </div>

        <div id="submit_for_check">
          <Button type="success" v-bind="sel" @click="submitforcheck(sel)">提交审核</Button>
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
        <p>等待程序员小哥开发</p>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import { api } from "./api";
import qs from "qs";
import { linkSync, link } from "fs";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      formItem: {
        id: "",
        StartPlace: "",
        EndPlace: "",
        distance: "",
        EconomyExpress: "",
        StandardExpress: "",
        express: ""
      },
      ruleValidate: {},
      modaldelet: false,
      modal_loading: false,
      modal: false,
      sel: [],
      data: [],
      editIndex: -1, // 当前聚焦的输入框的行数
      editItem: {
        id: "",
        StartPlace: "",
        EndPlace: "",
        distance: "",
        EconomyExpress: "",
        StandardExpress: "",
        express: ""
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
          title: "起始地",
          slot: "StartPlace",
          sortable: true,
          tooltip: true
        },
        {
          title: "目的地",
          slot: "EndPlace",
          sortable: true
        },
        {
          title: "距离",
          slot: "distance"
        },
        {
          title: "经济快递",
          slot: "EconomyExpress"
        },
        {
          title: "标准快递",
          slot: "StandardExpress"
        },
        {
          title: "特快",
          slot: "express"
        },
        {
          title: "操作",
          slot: "action"
        }
      ]
    };
  },
  mounted() {
    this.getChargeList(this.currentPage, this.pageSize);
  },
  methods: {
    getChargeList(currentPage, pageSize) {
      const self = this;
      api
        .getChargeList(currentPage, pageSize)
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
    remove(sel) {
      const self = this;
      if (sel.length > 0) {
        this.modal_loading = true;
        api
          .removeChargeList(sel)
          .then(response => {
            if (response.data.status === 200) {
              this.modal_loading = false;
              this.modaldelet = false;
              this.getChargeList(this.currentPage, this.pageSize);
              this.$Message.success("删除成功");
            } else {
              this.$Message.error("没有获取到数据");
              this.modal_loading = false;
              this.modaldelet = false;
            }
          })
          .catch(function(error) {
            self.$Message.error("请求超时,请检查连接信息");
            self.modal_loading = false;
            self.modaldelet = false;
          });
      } else {
        this.$Message.error("你还没有选择");
        setTimeout(() => {
          this.modal_loading = false;
          this.modaldelet = false;
        }, 100);
      }
    },
    handleEdit(row, index) {
      this.editItem.id = row.id;
      this.editItem.StartPlace = row.StartPlace;
      this.editItem.EndPlace = row.EndPlace;
      this.editItem.distance = row.distance;
      this.editItem.EconomyExpress = row.EconomyExpress;
      this.editItem.StandardExpress = row.StandardExpress;
      this.editItem.express = row.express;
      this.editIndex = index;
    },
    handleSave(editItem) {
      const self = this;
      api
        .chargeListSave(editItem)
        .then(response => {
          // console.log(response);
          if (response.data.status === 200) {
            this.getLoadCarList();
            this.$Message.success("修改成功");
          } else {
            this.$Message.error("没有获取到数据");
          }
        })
        .catch(function(error) {
          self.$Message.error("请求超时,请检查连接信息");
        });
      this.editIndex = -1;
    },
    submitform(formItem) {
      const self = this;
      self.$refs["formItem"].validate(valid => {
        if (valid) {
          api
            .chargeListSubmitForm(formItem)
            .then(response => {
              if (response.data.status === 200) {
                self.$Message.success("添加成功");
                self.getChargeList(this.currentPage, this.pageSize);
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
      this.getChargeList(page, this.pageSize);
    },
    changePageSize(pageSize) {
      // console.log(pageSize);
      this.getChargeList(this.currentPage, pageSize);
    }
  }
};
</script>
<style>
#search {
  margin: 10px;
  width: 35%;
}
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
