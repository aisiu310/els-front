<template>
  <div>
    <Tabs>
      <TabPane label="装车单" icon="ios-paper-plane">
        <Table stripe border :columns="columns" :data="data" @on-selection-change="select">
          <template slot-scope="{row,index}" hidden slot="id">
            <span>{{row.id}}</span>
          </template>
          <template slot-scope="{row,index}" slot="job">
            <input type="text" v-model="editItem.job" v-if="editIndex === index" />
            <span v-else>{{row.job}}</span>
          </template>
          <template slot-scope="{row,index}" slot="salary">
            <input type="text" v-model="editItem.salary" v-if="editIndex === index" />
            <span v-else>{{row.salary}}</span>
          </template>
          <template slot-scope="{row,index}" slot="royalty">
            <input type="text" v-model="editItem.royalty" v-if="editIndex === index" />
            <span v-else>{{row.royalty}}</span>
          </template>
          <template slot-scope="{row,index}" slot="SingleFreight">
            <input type="text" v-model="editItem.SingleFreight" v-if="editIndex === index" />
            <span v-else>{{row.SingleFreight}}</span>
          </template>
          <template slot-scope="{row,index}" slot="FreightNumber">
            <input type="text" v-model="editItem.FreightNumber" v-if="editItem.editIndex === index" />
            <span v-else>{{row.FreightNumber}}</span>
          </template>
          <template slot-scope="{row,index}" slot="bonus">
            <input type="text" v-model="editItem.bonus" v-if="editIndex === index" />
            <span v-else>{{row.bonus}}</span>
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
              <FormItem label="装车日期" prop="job">
                <Input v-model="formItem.job" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="营业厅编号" prop="salary">
                <Input v-model="formItem.salary" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="运输编号" prop="royalty">
                <Input v-model="formItem.royalty" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="到达地" prop="SingleFreight">
                <Input v-model="formItem.SingleFreight" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="车牌号" prop="FreightNumber">
                <Input v-model="formItem.FreightNumber" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="监装员" prop="bonus">
                <Input v-model="formItem.bonus" placeholder="Enter something..."></Input>
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
        job: "",
        salary: "",
        royalty: "",
        SingleFreight: "",
        FreightNumber: "001",
        bonus: "张三"
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
        salary: "",
        royalty: "",
        SingleFreight: "",
        FreightNumber: "001",
        bonus: "张三"
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
          title: "底薪",
          slot: "salary",
          sortable: true
        },
        {
          title: "提成",
          slot: "royalty"
        },
        {
          title: "单次运费",
          slot: "SingleFreight"
        },
        {
          title: "计次",
          slot: "FreightNumber"
        },
        {
          title: "奖金",
          slot: "bonus"
        },
        {
          title: "操作",
          slot: "action"
        }
      ]
    };
  },
  mounted() {
    this.getSalaryList(this.currentPage, this.pageSize);
  },
  methods: {
    getSalaryList(currentPage, pageSize) {
      const self = this;
      api
        .getSalaryList(currentPage, pageSize)
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
          .removeSalaryList(sel)
          .then(response => {
            if (response.data.status === 200) {
              this.modal_loading = false;
              this.modaldelet = false;
              this.getSalaryList(this.currentPage, this.pageSize);
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
      this.editItem.salary = row.salary;
      this.editItem.royalty = row.royalty;
      this.editItem.SingleFreight = row.SingleFreight;
      this.editItem.FreightNumber = row.FreightNumber;
      this.editItem.bonus = row.bonus;
      this.editIndex = index;
    },
    handleSave(editItem) {
      const self = this;
      api
        .salaryListSave(editItem)
        .then(response => {
          // console.log(response);
          if (response.data.status === 200) {
            this.getSalaryList();
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
            .salaryListSubmitForm(formItem)
            .then(response => {
              if (response.data.status === 200) {
                self.$Message.success("添加成功");
                self.getSalaryList();
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
      this.getSalaryList(page, this.pageSize);
    },
    changePageSize(pageSize) {
      // console.log(pageSize);
      this.getSalaryList(this.currentPage, pageSize);
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
