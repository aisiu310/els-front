<template>
  <div>
    <Tabs>
      <!-- 接收管理Pane -->
      <TabPane label="装车管理" icon="ios-paper-plane">
        <!-- 接收管理Pane ~ card背景 -->
        <Row style="background:#eee;padding:20px">
          <!-- 接收管理Pane~已揽订单card -->
          <Col span="11" style="width:24%">
            <Card :bordered="false">
              <p slot="title">已揽订单</p>
              <Table :columns="orderColumns" @on-selection-change="selectOrder"></Table>
              <Button
                type="primary"
                id="order_button"
                @click.native="createLoadCarList();modal = true"
              >生成装车单</Button>
            </Card>
          </Col>
          <!-- 接收管理Pane~装车单card -->
          <Col span="11" offset="2" style="width:66%">
            <Card>
              <p slot="title">装车单</p>
              <Table stripe border :columns="columns" :data="data" @on-selection-change="select">
                <template slot-scope="{row,index}" hidden slot="id">
                  <input type="text" v-model="editItem.id" v-if="editIndex === index" />
                  <span v-else>{{row.id}}</span>
                </template>
                <template slot-scope="{row,index}" slot="date">
                  <span v-model="editItem.date">{{row.date}}</span>
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
                  <span>{{row.state}}</span>
                </template>
                <template slot-scope="{ row }" slot="id">
                  <strong>{{ row.date }}</strong>
                </template>
                <template slot-scope="{row,index}" slot="action">
                  <div v-if="editIndex === index">
                    <Button :v-bind="editItem" @click="handleSave(editItem)">save</Button>
                    <Button @click="editIndex = -1">cancel</Button>
                  </div>
                  <div v-else>
                    <Button @click="handleEdit(row,index)">修改</Button>
                  </div>
                </template>
              </Table>
              <!-- 接收管理Pane~装车单card~删除 -->
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
              <!-- 接收管理Pane~装车单card~新增 -->
              <!-- <Button @click="modal = true"></Button> -->
              <Modal
                v-model="modal"
                title="添加"
                v-bind="formItem"
                @on-ok="submitform(formItem)"
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
              <!-- 接收管理Pane~装车单card~审核 -->
              <div id="submit_for_check">
                <Button type="success" v-bind="sel" @click="submitforcheck(sel)">提交审核</Button>
              </div>
              <!-- 接收管理Pane~装车单card~页码-->
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
            </Card>
          </Col>
        </Row>
      </TabPane>
      <!-- 历史记录Pane -->
      <TabPane label="历史记录" icon="ios-clock-outline">
        <img src="../../assets/B_G.png" width="100%" height="660px" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import qs from "qs";
import { api } from "./api";
import { linkSync, link } from "fs";
import { error } from "util";
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
        date: "",
        code: "18001",
        transportationId: "1234567890123456789",
        placeOfArrival: "南京",
        carCode: "001",
        supervisor: "张三",
        escort: "李四",
        freight: "1000",
        orderList: ""
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
      selOrd: [],
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
      orderColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "运费",
          slot: "freight"
        },
        {
          title: "订单号",
          slot: "code",
          tooltip: true
        },
        {
          title: "到达地",
          slot: "addresseeRegion",
          filters: [
            {
              label: "北京",
              value: "北京"
            },
            {
              label: "上海",
              value: "上海"
            },
            {
              label: "南京",
              value: "南京"
            },
            {
              label: "武汉",
              value: "武汉"
            },
            {
              label: "成都",
              value: "成都"
            },
            {
              label: "重庆",
              value: "重庆"
            },
            {
              label: "深圳",
              value: "深圳"
            },
            {
              label: "厦门",
              value: "厦门"
            },
            {
              label: "天津",
              value: "天津"
            },
            {
              label: "苏州",
              value: "苏州"
            },
            {
              label: "合肥",
              value: "合肥"
            },
            {
              label: "广州",
              value: "广州"
            }
          ],
          filterMethod(value, row) {
            return row.addresseeRegion.indexOf(value) > -1;
          }
        }
      ],
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
          slot: "state",
          render: (h, params) => {
            const row = params.row;
            const color =
              row.status === 1
                ? "primary"
                : row.status === 0
                ? "success"
                : "error";
            const text =
              row.status === 1
                ? "Working"
                : row.status === 0
                ? "已审核"
                : "待审核";

            return h(
              "Tag",
              {
                props: {
                  type: "dot",
                  color: color
                }
              },
              text
            );
          }
        },
        {
          title: "操作",
          slot: "action"
        }
      ]
    };
  },
  mounted() {
    this.getLoadCarList(this.currentPage, this.pageSize);
    this.getOrderList();
  },
  methods: {
    //获取已揽件订单信息，生成营业厅装车单
    getOrderList() {
      const self = this;
      let code = sessionStorage.getItem("hallCode");
      api
        .agetOrderList(code)
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            self.orderColumns = response.date.date;
          } else {
            self.$Message.error(response.date.msg);
          }
        })
        .catch(error => {
          alert("网络错误，请检查连接信息");
        });
    },
    //根据快递员已揽订单生成营业厅装车单，这里填充form表单
    createLoadCarList() {
      let self = this;
      self.formItem.code = sessionStorage.getItem("hallCode");
      self.formItem.date = new Date();
      self.formItem.transportationId = this.getCode();
      //目的地，出库单有数据时去掉注释使用
      // self.formItem.placeOfArrival = selOrd[0].placeOfArrival;
      self.formItem.carCode = "001";
      self.formItem.supervisor = sessionStorage.getItem("userName");
      self.formItem.freight = "1200";
      //this.caculateMoney();
      self.formItem.orderList = String(this.gatherReceiptCode());
    },
    //选中已揽订单，存入selOrd
    selectOrder(selection, row) {
      this.selOrd = selection;
    },
    //查询装车单~自测成功
    getLoadCarList(currentPage, pageSize) {
      const self = this;
      // console.log(currentPage, pageSize);
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
    //添加装车单~自测成功
    submitform(formItem) {
      const self = this;
      self.$refs["formItem"].validate(valid => {
        if (valid) {
          api
            .loadCarListSubmitForm(formItem)
            .then(response => {
              console.log(response);
              if (response.data.status === 200) {
                self.$Message.success("添加成功");
                self.getLoadCarList(this.currentPage, this.pageSize);
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
    //将已揽订单号汇成订单集合
    gatherReceiptCode() {
      let self = this;
      var data = self.selOrd;
      var list = [];
      if (data.length) {
        data.forEach(Element => {
          list.push(Element.code);
        });
        return list;
      } else {
        self.$Message.error("快递单号为空");
      }
    },
    //随机生成中转单号
    getCode() {
      let listNumber = "",
        part2 = "";
      let part1 = sessionStorage.getItem("hallCode");
      for (var i = 0; i < 14; i++) {
        part2 += Math.floor(Math.random() * 10);
      }
      listNumber = part1 + part2;
      return listNumber;
    },
    //计算运费
    // caculateMoney() {
    //   let self = this;
    //   let data = self.selOrd;
    //   let summoney = 0;
    //   if (data.length) {
    //     data.forEach(Element => {
    //       summoney += Element.freight;
    //     });
    //     return summoney;
    //   } else {
    //     self.$Message.error("没有已揽件订单");
    //   }
    // },
    //
    //选中装车单，存入sel
    select(selection, row) {
      this.sel = selection;
    },

    //删除装车单~自测成功
    remove(sel) {
      const self = this;
      if (sel.length > 0) {
        this.modal_loading = true;
        api
          .loadCarListRemove(sel)
          .then(response => {
            console.log(response);
            if (response.data.status === 200) {
              this.modal_loading = false;
              this.modaldelet = false;
              this.getLoadCarList(this.currentPage, this.pageSize);
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
    //修改装车单~自测成功
    handleSave(editItem) {
      const self = this;
      api
        .loadcarListSave(editItem)
        .then(response => {
          console.log(response);
          if (response.data.status === 200) {
            this.getLoadCarList(this.currentPage, this.pageSize);
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
    cancle() {
      this.$Message.info("取消操作");
    },
    //装车单提交审核~自测成功
    submitforcheck(sel) {
      const self = this;
      if (sel.length > 0) {
        api
          .loadCarListSubmitForCheck(sel)
          .then(response => {
            console.log(response);
            if (response.data.status === 200) {
              this.getLoadCarList(this.currentPage, this.pageSize);
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
      this.getLoadCarList(page, this.pageSize);
    },
    changePageSize(pageSize) {
      // console.log(pageSize);
      this.getLoadCarList(this.currentPage, pageSize);
    }
  }
};
</script>
<style scoped>
#order_button {
  margin: 10px;
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
