<template>
  <div>
    <Tabs>
      <TabPane label="司机信息" icon="ios-car">
        <!-- <div id="search">
          <Input
            v-model="inputData"
            :on-click="search(inputData)"
            search
            enter-button
            placeholder="请输入司机编号"
          />
        </div>-->
        <Table stripe border :columns="columns" :data="data" @on-selection-change="select">
          <template slot-scope="{row,index}" hidden slot="id">
            <span>{{row.id}}</span>
          </template>
          <template slot-scope="{row,index}" slot="number">
            <input type="text" v-model="formItem.number" v-if="editIndex === index" />
            <span v-else>{{row.number}}</span>
          </template>
          <template slot-scope="{row,index}" slot="code">
            <input type="text" v-model="formItem.code" v-if="editIndex === index" />
            <span v-else>{{row.code}}</span>
          </template>
          <template slot-scope="{row,index}" slot="name">
            <input type="text" v-model="formItem.name" v-if="editIndex === index" />
            <span v-else>{{row.name}}</span>
          </template>
          <template slot-scope="{row,index}" slot="birthday">
            <input type="text" v-model="formItem.birthday" v-if="editIndex === index" />
            <span v-else>{{row.birthday}}</span>
          </template>
          <template slot-scope="{row,index}" slot="identity">
            <input type="text" v-model="formItem.identity" v-if="editIndex === index" />
            <span v-else>{{row.identity}}</span>
          </template>
          <template slot-scope="{row,index}" slot="phone">
            <input type="text" v-model="formItem.phone" v-if="editIndex === index" />
            <span v-else>{{row.phone}}</span>
          </template>
          <template slot-scope="{row,index}" slot="gender">
            <input type="text" v-model="formItem.gender" v-if="editIndex === index" />
            <span v-else>{{row.gender}}</span>
          </template>
          <template slot-scope="{row,index}" slot="endDate">
            <input type="text" v-model="formItem.endDate" v-if="editIndex === index" />
            <span v-else>{{row.endDate}}</span>
          </template>

          <template slot-scope="{ row }" slot="date">
            <strong>{{ row.date }}</strong>
          </template>

          <template slot-scope="{row,index}" slot="action">
            <div v-if="editIndex === index">
              <Button v-bind="formItem" @click="handleSave(formItem)">save</Button>
              <Button @click="editIndex = -1">cancel</Button>
            </div>
            <div v-else>
              <Button @click="handleEdit(row,index)">操作</Button>
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

        <div id="driver_list_add">
          <Button type="primary" @click="modal = true">添加</Button>
          <Modal v-model="modal" title="添加" @on-ok="submitform(formItem)" @on-cancle="cancle">
            <Form :model="formItem" :label-width="80" ref="formItem" :rules="ruleValidate">
              <FormItem label="司机编号">
                <Input v-model="formItem.number" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="营业厅编号">
                <Input v-model="formItem.code" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="姓名">
                <Input v-model="formItem.name" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="出生日期">
                <Row>
                  <Col span="11">
                    <DatePicker
                      :options="options"
                      type="date"
                      placeholder="Select date"
                      v-model="formItem.birthday"
                    ></DatePicker>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="身份证号">
                <Input v-model="formItem.identity" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="手机">
                <Input v-model="formItem.phone" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="性别">
                <Input v-model="formItem.gender" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="行驶证期限">
                <Row>
                  <Col span="11">
                    <DatePicker
                      type="date"
                      :options="options"
                      placeholder="Select date"
                      v-model="formItem.endDate"
                    ></DatePicker>
                  </Col>
                </Row>
              </FormItem>
            </Form>
          </Modal>
        </div>

        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="sum" @on-change="changePage" show-elevator show-total></Page>
          </div>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import { api } from "./api";
import { error } from "util";
import { appendFile } from "fs";
export default {
  data() {
    return {
      inputData: "",
      options: {
        shortcuts: [
          {
            text: "Today",
            value() {
              return new Date();
            },
            onClick: picker => {
              this.$Message.info("Click today");
            }
          },
          {
            text: "Yesterday",
            value() {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              return date;
            },
            onClick: picker => {
              this.$Message.info("Click yesterday");
            }
          }
        ]
      },
      sum: 0,
      currentPage: 1,
      pageSize: 10,
      modaldelet: false,
      modal_loading: false,
      modal: false,
      sel: [],
      data: [],
      editIndex: -1, // 当前聚焦的输入框的行数
      formItem: {
        id: "",
        number: "12123",
        code: "02500",
        name: "西恩思",
        birthday: "1997-12-07",
        identity: "8798790879807908",
        phone: "176843792387",
        gender: "男",
        endDate: "2009-12-20"
      },
      ruleValidate: {
        // birthday: [
        //   {
        //     required: true,
        //     message: "日期不能为空",
        //     trigger: "change",
        //     type: "date"
        //   }
        // ],
        // endDate: [
        //   {
        //     required: true,
        //     message: "日期不能为空",
        //     trigger: "change",
        //     type: "date"
        //   }
        // ]
      },
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
          title: "司机编号",
          slot: "number",
          sortable: true
        },
        {
          title: "营业厅编号",
          slot: "code"
        },
        {
          title: "姓名",
          slot: "name"
        },
        {
          title: "出生日期",
          slot: "birthday"
        },
        {
          title: "身份证号码",
          slot: "identity",
          sortable: true
        },
        {
          title: "手机号",
          slot: "phone",
          sortable: true
        },
        {
          title: "性别",
          slot: "gender",
          sortable: true,
          filters: [
            {
              label: "男",
              value: "man"
            },
            {
              label: "女",
              value: "woman"
            }
          ],
          filterMultiple: true,
          filterMethod(value, row) {
            return row.driversex.indexOf(value) > -1;
          }
        },
        {
          title: "行驶证有效期",
          slot: "endDate",
          sortable: true
        },
        {
          title: "操作",
          slot: "action"
        }
      ]
    };
  },
  mounted() {
    this.getDriverList(this.currentPage, this.pageSize);
  },
  methods: {
    //查询司机信息~与余雷测试成功
    getDriverList(currentPage, pageSize) {
      let self = this;
      api
        .getDriverList(currentPage, pageSize)
        .then(response => {
          self.data = response.list;
        })
        .catch(function(error) {
          alert("请求超时,请检查链接信息");
        });
    },
    // queryDriverList(inputData) {
    //   let self = this;
    //   api
    //     .search(inputData)
    //     .then(response => {
    //       console.log(response);
    //       self.data = response.list;
    //     })
    //     .catch(error => {
    //       alert("请求超时,请检查链接信息");
    //     });
    // },
    handleEdit(row, index) {
      this.formItem.id = row.id;
      this.formItem.number = row.number;
      this.formItem.code = row.code;
      this.formItem.name = row.name;
      this.formItem.birthday = row.birthday;
      this.formItem.identity = row.identity;
      this.formItem.phone = row.phone;
      this.formItem.gender = row.gender;
      this.formItem.endDate = row.endDate;
      this.editIndex = index;
    },
    handleSave(editItem) {
      let self = this;
      api
        .driverListSave(editItem)
        .then(response => {
          console.log(response);
          if (response.data.status === 200) {
            self.getDriverList(self.currentPage, self.pageSize);
            self.$Message.success("修改成功");
          }
        })
        .catch(error => {
          alert("请求超时,请检查连接信息");
        });
      this.editIndex = -1;
    },
    select(selection, row) {
      this.sel = selection;
    },
    remove(sel) {
      let self = this;
      if (sel.length > 0) {
        self.modal_loading = true;
        api
          .removeDriverList(sel)
          .then(response => {
            console.log(response);
            if (response.data.status === 200) {
              self.modal_loading = false;
              self.modaldelet = false;
              self.getDriverList(self.currentPage, self.pageSize);
              self.$Message.success("删除成功");
            } else {
              self.$Message.warning(response.data.msg);
              self.modal_loading = false;
              self.modaldelet = false;
            }
          })
          .catch(function(error) {
            self.$Message.error("请求超时,请检查连接信息");
            self.modal_loading = false;
            self.modaldelet = false;
          });
      } else {
        self.$Message.error("你还没有选择");
        setTimeout(() => {
          self.modal_loading = false;
          self.modaldelet = false;
        }, 100);
      }
    },
    submitform(formItem) {
      // this.$refs[name].validate(valid => {
      //   if (valid) {
      if (formItem) {
        api
          .driverListSubmitForm(formItem)
          .then(response => {
            console.log(response);
            if (response.data) {
              this.$Message.success("添加成功");
              this.getDriverList(this.currentPage, this.pageSize);
            }
          })
          .catch(function(error) {
            this.$Message.error("请求超时,请检查连接信息");
          });
      } else {
        this.modal = "true";
        this.$Message.error("操作失败");
      }
      // });
    },
    cancle() {
      this.$Message.info("取消操作");
    },
    changePage(page) {
      this.getDriverList(page, this.pageSize);
    },
    changePageSize(pageSize) {
      this.getDriverList(this.currentPage, pageSize);
    }
  }
};
</script>

<style >
#delete_button {
  margin: 10px;
  float: left;
}

#driver_list_add {
  border: 0px solid rebeccapurple;
  margin: 10px;
  width: auto;
  height: auto;
  float: left;
}
</style>
