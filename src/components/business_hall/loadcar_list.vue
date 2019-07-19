<template>
  <div>
    <Tabs>
      <TabPane label="装车单" icon="ios-paper-plane">
        <Table stripe border :columns="columns" :data="data" @on-selection-change="select">
          <template slot-scope="{row,index}" hidden slot="id">
            <input type="text" v-model="editItem.id" v-if="editIndex === index" />
            <span v-else>{{row.id}}</span>
          </template>
          <template slot-scope="{row,index}" slot="date">
            <input type="text" v-model="editItem.data" v-if="editIndex === index" />
            <span v-else>{{row.date}}</span>
          </template>
          <template slot-scope="{row,index}" slot="code">
            <input type="text" v-model="editItem.code" v-if="editIndex === index" />
            <span v-else>{{row.code}}</span>
          </template>
          <template slot-scope="{row,index}" slot="transportationId">
            <input type="text" v-model="editItem.transportationId" v-if="editIndex === index" />
            <span v-else>{{row.transportationId}}</span>
          </template>
          <template slot-scope="{row,index}" slot="placeOfArrival">
            <input type="text" v-model="editItem.placeOfArrival" v-if="editIndex === index" />
            <span v-else>{{row.placeOfArrival}}</span>
          </template>
          <template slot-scope="{row,index}" slot="carCode">
            <input type="text" v-model="editItem.carCode" v-if="editItem.editIndex === index" />
            <span v-else>{{row.carCode}}</span>
          </template>
          <template slot-scope="{row,index}" slot="supervisor">
            <input type="text" v-model="editItem.supervisor" v-if="editIndex === index" />
            <span v-else>{{row.supervisor}}</span>
          </template>
          <template slot-scope="{row,index}" slot="escort">
            <input type="text" v-model="editItem.escort" v-if="editIndex === index" />
            <span v-else>{{row.escort}}</span>
          </template>
          <template slot-scope="{row,index}" slot="freight">
            <input type="text" v-model="editItem.freight" v-if="editIndex === index" />
            <span v-else>{{row.freight}}</span>
          </template>
          <template slot-scope="{row,index}" slot="orderList">
            <input type="text" v-model="editItem.orderList" v-if="editIndex === index" />
            <span v-else>{{row.orderList}}</span>
          </template>
          <template slot-scope="{row,index}" slot="state">
            <input type="text" v-model="editItem.state" v-if="editIndex === index" />
            <span v-else>{{row.state}}</span>
          </template>
          <template slot-scope="{ row }" slot="id">
            <strong>{{ row.date }}</strong>
          </template>
          <template slot-scope="{row,index}" slot="action">
            <div v-if="editIndex === index">
              <Button :v-bind="formItem" @click="handleSave(index)">save</Button>
              <Button @click="editIndex = -1">cancel</Button>
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
              <FormItem label="装车日期" prop="date">
                <Row>
                  <Col span="11">
                    <DatePicker
                      type="date"
                      placeholder="Select date"
                      :options="options"
                      v-model="formItem.date"
                    ></DatePicker>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="营业厅编号" prop="code">
                <Input v-model="formItem.code" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="运输编号" prop="transportationId">
                <Input v-model="formItem.transportationId" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="到达地" prop="placeOf Arrival">
                <Input v-model="formItem.placeOfArrival" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="车牌号" prop="carCode">
                <Input v-model="formItem.carCode" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="监装员" prop="supervisor">
                <Input v-model="formItem.supervisor" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="押运员" prop="escort">
                <Input v-model="formItem.escort" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="运费" prop="freight">
                <Input v-model="formItem.freight" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="订单号集合" prop="orderList">
                <Input v-model="formItem.orderList" placeholder="Enter something..."></Input>
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
import { api } from "./api";
import { linkSync, link } from "fs";
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
      formItem: {
        id: "",
        date: new Date(),
        code: sessionStorage.getItem("accountId"),
        transportationId: "1234567890123456789",
        placeOfArrival: "香港",
        carCode: "001",
        supervisor: "张三",
        escort: "李四",
        freight: "1000",
        orderList: "1234567890,1234554321"
      },
      ruleValidate: {
        date: [
          {
            required: true,
            message: "日期不能为空",
            trigger: "change",
            type: "date"
          }
        ],
        code: [
          {
            required: true,
            message: "营业厅编号不能为空",
            trigger: "blur",
            type: "string"
          }
        ],
        transportationId: [
          {
            required: true,
            message: "运输编号不为空",
            trigger: "blur",
            type: "string"
          },
          {
            validator: transportationIdRule,
            trigger: "blur",
            trigger: "change"
          }
        ]
      },
      modaldelet: false,
      modal_loading: false,
      modal: false,
      sel: [],
      data: [],
      editIndex: -1, // 当前聚焦的输入框的行数
      editItem: {
        id: "",
        date: "",
        code: "",
        transportationId: "",
        placeOfArrival: "",
        carCode: "",
        supervisor: "",
        escort: "",
        freight: "",
        orderList: ""
        // state:""
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
          title: "装车日期",
          slot: "date",
          sortable: true,
          tooltip: true
        },
        {
          title: "营业厅编号",
          slot: "code",
          sortable: true
        },
        {
          title: "运输单号",
          slot: "transportationId"
        },
        {
          title: "到达地",
          slot: "placeOfArrival"
        },
        {
          title: "车牌号",
          slot: "carCode"
        },
        {
          title: "监装员",
          slot: "supervisor"
        },
        {
          title: "押运员",
          slot: "escort"
        },
        {
          title: "运费",
          slot: "freight"
        },
        {
          title: "订单号集合",
          slot: "orderList",
          tooltip: true
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
    sessionStorage.setItem("accountId", "025000");
    this.getLoadCarList(this.currentPage, this.pageSize);
  },
  methods: {
    getLoadCarList(currentPage, pageSize) {
      const self = this;
      console.log(currentPage, pageSize);
      api
        .getLoadCarList(currentPage, pageSize)
        .then(response => {
          console.log(response);
          if (response.data.status === 200) {
            self.data = response.data.data.list;
            self.sum = response.data.data.total;
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
      var list = [];
      if (sel.length > 0) {
        this.modal_loading = true;
        sel.forEach(element => {
          list.push(element.id);
        });
        this.$axios
          .delete("http://192.168.2.229/loadcar/removeLoadingFake", {
            data: list
          })
          .then(response => {
            if (response.data.status === 200) {
              this.modal_loading = false;
              this.modaldelet = false;
              this.getLoadCarList();
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
      this.editItem.date = row.date;
      this.editItem.code = row.code;
      this.editItem.transportationId = row.transportationId;
      this.editItem.placeOfArrival = row.placeOfArrival;
      this.editItem.carCode = row.carCode;
      this.editItem.supervisor = row.supervisor;
      this.editItem.escort = row.escort;
      this.editItem.freight = row.freight;
      this.editItem.orderList = row.orderList;
      this.editItem.status = row.status;
      this.editIndex = index;
    },
    handleSave(index) {
      const self = this;
      this.$axios
        .put("http://192.168.2.229/loadcar/modifyLoadingById", self.editItem)
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
      self.$refs[formItem].validate(valid => {
        if (valid) {
          self.$axios
            .post("http://192.168.2.229/loadcar/addLoading", self.formItem)
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
    submitforcheck(sel) {
      const self = this;
      var list = [];
      if (sel.length > 0) {
        sel.forEach(element => {
          if (element.state === 0) {
            list.push(element.id);
          }
        });
        this.$axios
          .put("http://192.168.2.229/loadcar/modifyStateList?state=1", list)
          .then(response => {
            if (response.data.status === 200) {
              this.getLoadCarList();
              this.$Message.success("提交成功");
            } else {
              this.$Message.error("提交失败");
            }
          })
          .catch(function(error) {
            self.$Message.error("请求超时,请检查连接信息");
          });
      } else {
        this.$Message.error("你还没有选择");
      }
    },
    changePage(page) {
      console.log(page);
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
