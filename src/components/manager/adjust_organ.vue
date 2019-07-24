<template>
  <div>
    <Tabs>
      <TabPane label="装车单" icon="ios-paper-plane">
        <Table stripe border :columns="columns" :data="data" @on-selection-change="select">
          <template slot-scope="{row,index}" hidden slot="id">
            <span>{{row.id}}</span>
          </template>
          <template slot-scope="{row,index}" slot="name">
            <input type="text" v-model="editItem.name" v-if="editIndex === index" />
            <span v-else>{{row.name}}</span>
          </template>
          <template slot-scope="{row,index}" slot="belong">
            <input type="text" v-model="editItem.belong" v-if="editIndex === index" />
            <span v-else>{{row.belong}}</span>
          </template>
          <template slot-scope="{row,index}" slot="rent">
            <input type="text" v-model="editItem.rent" v-if="editIndex === index" />
            <span v-else>{{row.rent}}</span>
          </template>
          <template slot-scope="{row,index}" slot="address">
            <input type="text" v-model="editItem.address" v-if="editIndex === index" />
            <span v-else>{{row.address}}</span>
          </template>

          <template slot-scope="{ row }" slot="id">
            <strong>{{ row.date }}</strong>
          </template>
          <template slot-scope="{row,index}" slot="action">
            <div v-if="editIndex === index">
              <Button :v-bind="editItem" @click="handleSave(editItem)">保存</Button>
              <Button @click="editIndex = -1">取消保存</Button>
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
              <FormItem label="装车日期" prop="name">
                <Input v-model="formItem.name" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="营业厅编号" prop="belong">
                <Input v-model="formItem.belong" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="运输编号" prop="rent">
                <Input v-model="formItem.rent" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="到达地" prop="address">
                <Input v-model="formItem.address" placeholder="Enter something..."></Input>
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
import qs from "qs";
import { linkSync, link } from "fs";
import { api } from "./api";
export default {
  data() {
    const transportationIdRule = (rule, value, callback) => {
      if (value.length !== 19) {
        callback(new Error("长度必须是19位"));
      } else {
        callback();
      }
    };
    return {
      currentPage: 1,
      pageSize: 10,
      formItem: {
        id: "",
        name: "",
        belong: "",
        rent: "",
        address: "香港"
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
        name: "",
        belong: "",
        rent: "",
        address: "香港"
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
          title: "名称",
          slot: "name",
          sortable: true,
          tooltip: true
        },
        {
          title: "归属",
          slot: "belong",
          sortable: true
        },
        {
          title: "租金",
          slot: "rent"
        },
        {
          title: "机构地址",
          slot: "address"
        },
        {
          title: "操作",
          slot: "action"
        }
      ]
    };
  },
  mounted() {
    sessionStorage.setItem("accountId", "025000");
    this.getOrganList(this.currentPage, this.pageSize);
  },
  methods: {
    getOrganList(currentPage, pageSize) {
      const self = this;
      api
        .getOrganList(currentPage, pageSize)
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
          .removeOrganList(sel)
          .then(response => {
            if (response.data.status === 200) {
              this.modal_loading = false;
              this.modaldelet = false;
              this.getOrganList();
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
      this.editItem.name = row.name;
      this.editItem.belong = row.belong;
      this.editItem.rent = row.rent;
      this.editItem.address = row.address;
      this.editIndex = index;
    },
    handleSave(editItem) {
      const self = this;
      api
        .organListSave(editItem)
        .then(response => {
          // console.log(response);
          if (response.data.status === 200) {
            this.getOrganList();
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
            .organListSubmitForm(formItem)
            .then(response => {
              if (response.data.status === 200) {
                self.$Message.success("添加成功");
                self.getLoadCarList();
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
