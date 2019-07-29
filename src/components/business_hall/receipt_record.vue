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
                  @click.native="showCourierReceiptRecord(courier.courierName,courier.courierId)"
                  :v-bind="courier"
                  :key="index"
                >
                  <p slot="title">
                    {{courier.courierName}}
                    <Badge :count="courier.count" id="hint"></Badge>
                  </p>
                  <p>工号{{courier.courierId}}，{{courier.count}}条收款记录</p>
                </Card>
              </Scroll>
            </div>

            <div slot="right">
              <Scroll :on-reach-bottom="handleReachBottom" height="720" loading-text="收款信息加载ing">
                <Card
                  dis-hover
                  v-for="(receipt, index) in receiptRecordTemp"
                  :key="index"
                  style="margin: 20px 0"
                >
                  <!-- <p v-if="tempReceiptRecord.length == 0">没有收款记录</p> -->
                  收款日期：{{receipt.paymentTime}}
                  收款快递员：{{receipt.courierName}}
                  收款金额：{{receipt.money}}
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

        <Modal
          width="40"
          v-model="modal"
          title="建立收款单"
          @on-ok="submitform(formItem)"
          @on-cancel="cancle"
        >
          <Form :model="formItem" :label-width="80">
            <FormItem label="营业厅编号">
              <Input prefix="md-briefcase" disabled v-model="formItem.number" />
            </FormItem>
            <FormItem label="收款单编号">
              <Input prefix="md-briefcase" disabled v-model="formItem.code" />
            </FormItem>
            <FormItem label="收款时间">
              <Input prefix="ios-time-outline" disabled v-model="formItem.time" />
            </FormItem>
            <FormItem label="收款金额">
              <Input prefix="logo-usd" disabled v-model="formItem.money" />
            </FormItem>
            <FormItem label="快递员工号">
              <Input prefix="ios-contact" disabled v-model="formItem.courierId" />
            </FormItem>
            <FormItem label="快递员姓名">
              <Input prefix="ios-contact" disabled v-model="formItem.courierName" />
            </FormItem>
            <FormItem label="快递单号集合">
              <Input
                prefix="ios-browsers-outline"
                disabled
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                v-model="formItem.orderList"
              />
            </FormItem>
          </Form>
        </Modal>
      </TabPane>

      <TabPane label="收款单" icon="ios-paper">
        <div>
          <rlist></rlist>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import { api } from "./api";
import Bus from "../reuse/bus";
import { connect } from "net";
import { lstat, link } from "fs";
import rlist from "./receipt_list";
export default {
  components: {
    rlist
  },
  data() {
    return {
      sum: 0,
      modal: false,
      split: 0.2,
      receiptRecordTemp: [],
      receiptRecord: [],
      courier: [],
      formItem: {
        number: "1",
        code: "1",
        time: "2019-7-21",
        money: "12",
        courierId: "18001",
        courierName: "褚岩",
        orderList: "0987654321"
      }
    };
  },
  mounted() {
    // this.courier = [
    //   {
    //     courierName: "褚岩",
    //     courierId: "087960",
    //     count: 3
    //   },
    //   {
    //     courierName: "程心",
    //     courierId: "087960",
    //     count: 1
    //   }
    // ];
    // this.receiptRecord = [
    //   {
    //     paymentTime: "2016-10-02",
    //     money: 25,
    //     courierName: "褚岩",
    //     code: "23452634365453"
    //   },
    //   {
    //     paymentTime: "2016-10-02",
    //     money: 20,
    //     courierName: "褚岩",
    //     code: "23452634365453"
    //   },
    //   {
    //     paymentTime: "2016-10-02",
    //     money: 188,
    //     courierName: "褚岩",
    //     code: "23452634365453"
    //   },
    //   {
    //     paymentTime: "2016-10-02",
    //     money: 20,
    //     courierName: "程心",
    //     code: "23452634365453"
    //   }
    // ];
    this.getCourierList();
  },
  methods: {
    getCourierList() {
      let self = this;
      api
        .getCourierList()
        .then(response => {
          console.log(response);
          if (response.data.status === 200) {
            // console.log(response.data.data[0]);
            // console.log(response.data.date[1]);
            self.receiptRecord = response.data.data[0];
            self.courier = response.data.date[1];
          }
        })
        .catch(function(error) {
          self.$Message.error("请求超时");
        });
    },
    showCourierReceiptRecord(name, id) {
      let self = this;
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("id", id);
      let list = [];
      if (name) {
        self.receiptRecord.forEach(Element => {
          if (Element.courierName == name) {
            list.push(Element);
          }
        });
        console.log(list);
        self.receiptRecordTemp = list;
      } else {
        self.$Message.error("");
      }
    },
    createlist() {
      let self = this;
      self.formItem.number = "025000";
      self.formItem.code = this.getCode();
      self.formItem.time = new Date();
      self.formItem.money = this.caculateMoney();
      self.formItem.courierName = this.getName();
      self.formItem.courierId = this.getId();
      self.formItem.orderList = String(this.gatherReceiptCode());
    },
    getNumber() {
      let number = sessionStorage.getItem("number");
      return number;
    },
    getCode() {
      let listNumber = "";
      let part1 = "025000";
      // let part1 = sessionStorage.getItem("businessId")
      let part3 = "";
      let myDate = new Date(); //获取当前年
      let part2 =
        myDate.getFullYear() + (myDate.getMonth() + 1) + myDate.getDate();
      for (var i = 0; i < 5; i++) {
        part3 += Math.floor(Math.random() * 10);
      }
      listNumber = part1 + part2 + part3;
      return listNumber;
    },
    getName() {
      let name = sessionStorage.getItem("courierName");
      return name;
    },
    getId() {
      let id = sessionStorage.getItem("courierId");
      return id;
    },
    caculateMoney() {
      let self = this;
      let data = self.receiptRecordTemp;
      let summoney = 0;
      if (data.length) {
        data.forEach(Element => {
          summoney += Element.money;
        });
        return summoney;
      } else {
        self.$Message.error("收款记录为空");
      }
    },
    gatherReceiptCode() {
      let self = this;
      var data = self.receiptRecordTemp;
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
    submitform(formItem) {
      let self = this;
      if (formItem) {
        api
          .receiptRecordSubmitForm(formItem)
          .then(response => {
            console.log(response);
            if (response.data.status === 200) {
              self.$Message.success("添加成功");
              self.getCourierList();
            }
          })
          .catch(function(error) {
            self.$Message.error("请求超时,请检查连接信息");
          });
      } else {
        self.modal = "true";
        self.$Message.error("操作失败");
      }
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
    cancle() {
      this.$Message.info("取消操作");
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


