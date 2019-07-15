<template>
  <div>
    <Tabs>
      <TabPane label="收款记录" icon="logo-yen">
        <div id="split">
          <Split v-model="split">
            <div slot="left" id="left">
              <h1 style="text-align: center">快递员信息</h1>
              <hr />
              <Scroll :on-reach-bottom="handleReachBottom" height="720" loading-text="人员信息加载ing">
                <Card
                  :bordered="true"
                  v-for="(courier,index) in courier"
                  id="card"
                  @click.native="showlist(courier.courier_name,courier.courier_id)"
                  :v-bind="name"
                  :key="index"
                >
                  <p slot="title">
                    {{courier.courier_name}}
                    <Badge :count="courier.count" id="hint"></Badge>
                    <Icon type="ios-notifications-outline" style="margin-left:6.5em" size="24"></Icon>
                  </p>
                  <p>工号{{courier.courier_id}}，{{courier.count}}条收款记录</p>
                </Card>
              </Scroll>
            </div>
            <div slot="right">
              <Scroll :on-reach-bottom="handleReachBottom" height="720" loading-text="收款信息加载ing">
                <Card
                  dis-hover
                  v-for="(receipt, index) in tempreceipt"
                  :key="index"
                  style="margin: 20px 0"
                >
                  收款日期：{{receipt.payment_time}}
                  收款快递员：{{receipt.courier_name}}
                  收款金额：{{receipt.total_fee}}
                  快递单号：{{receipt.code}}
                </Card>
                <Button
                  @click.native="createlist();modal = true"
                  type="primary"
                  style="float:right"
                >建立收款单</Button>
              </Scroll>
            </div>
          </Split>
        </div>

        <Modal width="40" v-model="modal" title="建立收款单" @on-ok="ok" @on-cancel="cancel">
          <Form :model="formItem" :label-width="80">
            <FormItem label="营业厅">
              <Input prefix="md-briefcase" disabled v-model="formItem.business" />
            </FormItem>
            <FormItem label="收款时间">
              <Input prefix="ios-time-outline" disabled v-model="formItem.time" />
            </FormItem>
            <FormItem label="收款金额">
              <Input prefix="logo-usd" disabled v-model="formItem.money" />
            </FormItem>
            <FormItem label="快递员工号">
              <Input prefix="ios-contact" disabled v-model="formItem.number" />
            </FormItem>
            <FormItem label="快递员姓名">
              <Input prefix="ios-contact" disabled v-model="formItem.name" />
            </FormItem>
            <FormItem label="快递单号">
              <Input prefix="ios-browsers-outline" disabled v-model="formItem.info" />
            </FormItem>
          </Form>
        </Modal>
      </TabPane>

      <TabPane label="收款单" icon="ios-paper">
        <Table stripe border :columns="columns" :data="receipt" @on-selection-change="select">
          <template slot-scope="{row,index}" slot="driverid">
            <input type="text" v-model="editDriverId" v-if="editIndex === index" />
            <span v-else>{{row.driverid}}</span>
          </template>
          <template slot-scope="{row,index}" slot="proceedtime">
            <input type="text" v-model="editProceedTime" v-if="editIndex === index" />
            <span v-else>{{row.proceedtime}}</span>
          </template>
          <template slot-scope="{row,index}" slot="proceedamount">
            <input type="text" v-model="editProceedAmount" v-if="editIndex === index" />
            <span v-else>{{row.proceedamount}}</span>
          </template>
          <template slot-scope="{row,index}" slot="proceedcourier">
            <input type="text" v-model="editProceedCourier" v-if="editIndex === index" />
            <span v-else>{{row.proceedcourier}}</span>
          </template>
          <template slot-scope="{row,index}" slot="ordernumber">
            <input type="text" v-model="editOrderNumber" v-if="editIndex === index" />
            <span v-else>{{row.ordernumber}}</span>
          </template>
          <template slot-scope="{ row }" slot="date">
            <strong>{{ row.date }}</strong>
          </template>
          <template slot-scope="{row,index}" slot="action">
            <div v-if="editIndex === index">
              <Button @click="handleSave(index)">save</Button>
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
            <span>Delete confirmation</span>
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
          <Button type="primary" @click="modal2 = true">添加</Button>
          <Modal v-model="modal2" title="添加" v-bind="formItem" @on-ok="submitform('formItem')" @on-cancle="cancle">
            <Form :model="formItem" :label-width="80">
              <FormItem label="DatePicker">
                <Row>
                  <Col span="11">
                    <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
                  </Col>
                </Row>
              </FormItem>

              <FormItem label="Address">
                <Input v-model="formItem.input" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="State">
                <Select v-model="formItem.select">
                  <Option value="arrive">arrive</Option>
                  <Option value="transfer">transfer</Option>
                </Select>
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
import Bus from "../reuse/bus";
import { connect } from "net";
import { lstat, link } from "fs";
export default {
  data() {
    return {
      modal2: false,
      modal: false,
      split: 0.2,
      receipt: [],
      tempreceipt: [],
      courier: [],
      name: [],
      receiptlist: [],
      formItem: {
        business: "",
        time: "",
        money: "",
        number: "",
        name: "",
        info: ""
      },

      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "司机编号",
          slot: "driverid",
          sortable: true
        },
        {
          title: "收款日期",
          slot: "proceedtime",
          sortable: true
        },
        {
          title: "收款金额",
          slot: "proceedamount",
          sortable: true,
          filters: [
            {
              label: ">100",
              value: ""
            },
            {
              label: "<100",
              value: ""
            }
          ],
          filterMultiple: true,
          filterMethod(value, row) {
            return row.proceedamount.indexOf(value) > -1;
          }
        },
        {
          title: "收款快递员",
          slot: "proceedcourier"
        },
        {
          title: "订单编号",
          slot: "ordernumber"
        },
        {
          title: "操作",
          slot: "action"
        }
      ],

      editIndex: -1, // 当前聚焦的输入框的行数
      editDriverId: "", // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
      editProceedTime: "", // 第二列输入框
      editProceedAmount: "", // 第三列输入框
      editProceedCourier: "", // 第四列输入框
      editOrderNumber: "", // 第五列输入框
      sum: 0
    };
  },
  mounted() {
    this.courier = [
      {
        courier_name: "褚岩",
        courier_id: "087960",
        count: 3
      },
      {
        courier_name: "程心",
        courier_id: "087960",
        count: 1
      }
    ];
    this.receipt = [
      {
        payment_time: "2016-10-02",
        total_fee: 25,
        courier_name: "褚岩",
        code: "23452634365453"
      },
      {
        payment_time: "2016-10-02",
        total_fee: 20,
        courier_name: "褚岩",
        code: "23452634365453"
      },
      {
        payment_time: "2016-10-02",
        total_fee: 188,
        courier_name: "褚岩",
        code: "23452634365453"
      },
      {
        payment_time: "2016-10-02",
        total_fee: 20,
        courier_name: "程心",
        code: "23452634365453"
      }
    ];
  },
  methods: {
    getcourielist() {
      this.$axios
        .get(" http://192.168.2.229/order/getPaymentInfoList", {
          params: {
            hallCode: "025000",
            date: "2019-07-12"
          }
        })
        .then(response => {
          this.receipt = response.data.data[0];
          this.courier = response.data.data[1];
          console.log(this.receipt, this.courier);
        })
        .catch(function(error) {
          alert("请求超时");
        });
    },
    showlist(val, id) {
      sessionStorage.setItem("name", val);
      sessionStorage.setItem("id", id);
      var list = [];
      if (val) {
        this.receipt.forEach(Element => {
          if (Element.courier_name == val) {
            list.push(Element);
          }
        });
        this.tempreceipt = list;
        // console.log(list);
      } else {
        this.$Message.error("错误");
      }
    },
    createlist() {
      var myDate = new Date(); //获取当前年
      var year = myDate.getFullYear(); //获取当前月
      var month = myDate.getMonth() + 1; //获取当前日
      var date = myDate.getDate();
      var hh = myDate.getHours(); //获取当前小时数(0-23)
      var mm = myDate.getMinutes(); //获取当前分钟数(0-59)
      if (mm < 10) mm = "0" + mm;
      var ss = myDate.getSeconds();
      if (ss < 10) ss = "0" + ss;
      this.formItem.business = this.getBusiness();
      this.formItem.time =
        year + "-" + month + "-" + date + "-" + " " + hh + ":" + mm + ":" + ss;
      this.formItem.money = this.caculatemoney();
      this.formItem.name = this.getName();
      this.formItem.number = this.getNumber();
      this.formItem.info = this.gatherReceiptCode();
    },
    getBusiness() {
      // Bus.$on('setBusiness',content =>{
      //     return content;
      //     console.log(content)
      // })
      var business = sessionStorage.getItem("business");
      return business;
    },
    getName() {
      var name = sessionStorage.getItem("name");
      return name;
    },
    getNumber() {
      var id = sessionStorage.getItem("id");
      return id;
    },
    caculatemoney() {
      var data = this.tempreceipt;
      var summoney = 0;
      if (data.length) {
        data.forEach(Element => {
          summoney += Element.total_fee;
        });
        return summoney;
        alert(summoney);
      } else {
        this.$Message.error("收款记录为空");
      }
    },
    gatherReceiptCode() {
      var data = this.tempreceipt;
      var list = [];
      if (data.length) {
        data.forEach(Element => {
          list.push(Element.code);
        });
        return list;
      } else {
        this.$Message.error("快递单号为空");
      }
    },
    submitform(formItem) {
      this.$refs[formItem].validate(valid => {
        if (valid) {
          this.$axios
            .post("url", {
              data: {
                code: this.formItem.business,
                time: this.formItem.time,
                money: this.formItem.money,
                courier_id: this.formItem.number,
                courier_name: this.formItem.name,
                order_list: this.formItem.info
              }
            })
            .then(response => {
              if (response.data) {
                this.$Message.success("添加成功");
                this.getdriverinfo();
              }
            })
            .catch(function(error) {
              this.$Message.error("请求超时,请检查连接信息");
            });
        } else {
          this.modal2 = "true";
          this.$Message.error("操作失败");
        }
      });
    },
    handleReachBottom() {
      return new Promise(resolve => {
        setTimeout(() => {
          const last = this.courier[this.courier.length - 1];
          for (let i = 1; i < 11; i++) {
            this.courier.push(last + i);
          }
          resolve();
        }, 2000);
      });
    },
    getreceiptlist() {
      this.$axios
        .get(" http://192.168.2.229/order/getPaymentInfoList", {
          params: {
            number: "025000",
            date: "2019-07-12"
          }
        })
        .then(response => {
          this.data = response.data.data;
          this.sum = response.data.length;
        })
        .catch(function(error) {
          alert("请求超时,加载本地数据");
        });
    },
    handleEdit(row, index) {
      this.editDriverId = row.driverid;
      this.editProceedTime = row.proceedtime;
      this.editProceedAmount = row.editProceedAmount;
      this.editProceedCourier = row.proceedcourier;
      this.editOrderNumber = row.ordernumber;
      this.editIndex = index;
    },
    handleSave(index) {
      this.editDriverId = row.driverid;
      this.editProceedTime = row.proceedtime;
      this.editProceedAmount = row.editProceedAmount;
      this.editProceedCourier = row.proceedcourier;
      this.editOrderNumber = row.ordernumber;
      this.editIndex = -1;
    },
    remove(sel) {
      if (sel.length) {
        this.modal_loading = true;
        sel.forEach(element => {
          this.$axios
            .delete(" http://192.168.2.229/order/getPaymentInfoList", {
              params: {
                number: element.carnumber
              }
            })
            .then(response => {
              if (response.data) {
                this.modal_loading = false;
                this.modaldelet = false;
                this.$Message.success("Successfully delete");
                this.getreceiptlist();
              } else {
                this.$Message.error("没有获取到数据");
              }
            })
            .catch(function(error) {
              alert("请求超时,请检查连接信息");
              this.modal_loading = false;
              this.modaldelet = false;
            });
        });
      } else {
        this.$Message.error("你还没有选择");
        setTimeout(() => {
          this.modal_loading = false;
          this.modaldelet = false;
        }, 100);
      }
    },
    cancle() {
      this.$Message.info("取消操作");
    },
    changePage(val) {
      // invoke the back-end API limit 10
      // 后端分页查询
      this.$axios
        .get("url", {
          params: {}
        })
        .then(response => {
          this.data = response.data.data;
        })
        .catch(function(error) {
          alert("请求超时,请检查连接信息");
        });
    }   
  }
};
</script>
<style>
#card {
  margin-bottom: 1em;
}
#hint {
  float: right;
}
#split {
  height: 65em;
  /* border: solid 1px rebeccapurple; */
}
#left {
  background: #eee;
  padding: 5px;
}
#left p {
  font-size: 1.2em;
}
</style>


