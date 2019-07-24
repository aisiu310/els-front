<template>
  <div>
    <Tabs>
      <TabPane label="装车单" icon="ios-paper-plane">
        <div id="search">
          <Input v-model="inputdata" placeholder="请输入查詢信息，可以是姓名、工號等">
            <Select v-model="option" slot="prepend" style="width: 80px">
              <Option value="id">id</Option>
              <Option value="name">name</Option>
              <Option value="job">job</Option>
            </Select>
            <Button slot="append" icon="ios-search" @click="search(option,inputdata)"></Button>
          </Input>
        </div>
        <Table stripe border :columns="columns" :data="data" @on-selection-change="select">
          <template slot-scope="{row,index}" hidden slot="id">
            <span>{{row.id}}</span>
          </template>
          <template slot-scope="{row,index}" slot="job">
            <input type="text" v-model="editItem.job" v-if="editIndex === index" />
            <span v-else>{{row.job}}</span>
          </template>
          <template slot-scope="{row,index}" slot="department">
            <input type="text" v-model="editItem.department" v-if="editIndex === index" />
            <span v-else>{{row.department}}</span>
          </template>
          <template slot-scope="{row,index}" slot="name">
            <input type="text" v-model="editItem.name" v-if="editIndex === index" />
            <span v-else>{{row.name}}</span>
          </template>
          <template slot-scope="{row,index}" slot="status">
            <input type="text" v-model="editItem.status" v-if="editIndex === index" />
            <span v-else>{{row.status}}</span>
          </template>
          <template slot-scope="{row,index}" slot="limit">
            <input type="text" v-model="editItem.limit" v-if="editItem.editIndex === index" />
            <span v-else>{{row.limit}}</span>
          </template>
          <template slot-scope="{row,index}" slot="password">
            <input type="text" v-model="editItem.password" v-if="editIndex === index" />
            <span v-else>{{row.password}}</span>
          </template>

          <template slot-scope="{ row }" slot="id">
            <strong>{{ row.id }}</strong>
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
              <FormItem label="职位" prop="job">
                <Input v-model="formItem.job" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="部门" prop="department">
                <Input v-model="formItem.department" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="姓名" prop="name">
                <Input v-model="formItem.name" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="工作状态" prop="status">
                <Input v-model="formItem.status" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="权限" prop="limit">
                <Input v-model="formItem.limit" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="密码" prop="password">
                <Input v-model="formItem.password" placeholder="Enter something..."></Input>
              </FormItem>
            </Form>
          </Modal>
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
import qs from "qs";
import { api } from "./api";
import { linkSync, link } from "fs";
export default {
  data() {
    return {
      inputdata: "",
      option: "",
      currentPage: 1,
      pageSize: 10,
      formItem: {
        id: "",
        job: "",
        department: "",
        name: "",
        status: "",
        limit: "",
        password: ""
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
        job: "",
        department: "",
        name: "",
        status: "",
        limit: "",
        password: ""
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
          title: "职位",
          slot: "job",
          sortable: true,
          tooltip: true
        },
        {
          title: "部门",
          slot: "department",
          sortable: true
        },
        {
          title: "姓名",
          slot: "name"
        },
        {
          title: "工作状态",
          slot: "status"
        },
        {
          title: "权限",
          slot: "limit"
        },
        {
          title: "密码",
          slot: "password"
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
    this.getPeopleList(this.currentPage, this.pageSize);
  },
  methods: {
    search(option, inputdata) {
      const self = this;
      let state = 1;
      currentPage = this.currentPage;
      pageSize = this.pageSize;
      api
        .search(currentPage, pageSize, option, inputdata)
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
    getPeopleList(currentPage, pageSize) {
      const self = this;
      api
        .getPeopleList(currentPage, pageSize)
        .then(response => {
          console.log(response);
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
          .removePeopleList(sel)
          .then(response => {
            if (response.data.status === 200) {
              this.modal_loading = false;
              this.modaldelet = false;
              this.getPeopleList();
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
      this.editItem.job = row.job;
      this.editItem.department = row.department;
      this.editItem.name = row.name;
      this.editItem.status = row.status;
      this.editItem.limit = row.limit;
      this.editItem.password = row.password;
      this.editIndex = index;
    },
    handleSave(editItem) {
      const self = this;
      api
        .peopleListSave(editItem)
        .then(response => {
          // console.log(response);
          if (response.data.status === 200) {
            this.getPeopleList();
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
      self.$refs[formItem].validate(valid => {
        if (valid) {
          api
            .peopleListSubmitForm(formItem)
            .then(response => {
              if (response.data.status === 200) {
                self.$Message.success("添加成功");
                self.getPeopleList();
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
      this.getPeopleList(page, this.pageSize);
    },
    changePageSize(pageSize) {
      // console.log(pageSize);
      this.getPeopleList(this.currentPage, pageSize);
    }
  }
};
</script>
<style>
#search {
  margin: 10px;
  width: 25%;
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
