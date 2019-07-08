<template>
  <div>
    <div class="header">
      <div class="word">成本管理（付款单）</div>
      <!-- search box -->
      <div class="search"></div>

      <div class="button">
        <Button type="primary" shape="circle" @click="calculate = true">成本结算</Button>
        <!-- calculate pay modal -->
        <Modal title="成本结算" v-model="calculate" :styles="{top: '20px'}" :footer-hide="true">
          <Form :model="calculate_data" :label-width="80">
            <FormItem label="付款日期">
              <Row>
                <Col span="11">
                  <DatePicker type="date" placeholder="选择付款日期" v-model="formItem.date"></DatePicker>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="总金额">
              <Input
                v-model="formItem.money"
                type="number"
                placeholder="付款总金额"
                prefix="logo-usd"
                :disabled="true"
              ></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="calculate_pay()">计算付款金额</Button>
              <Button style="margin-left: 8px" @click="calculate = false">退出</Button>
            </FormItem>
          </Form>
        </Modal>

        <Button type="primary" shape="circle" @click="modal = true">新建付款单</Button>
        <!-- add payee modal -->
        <Modal title="新建付款单" v-model="modal" :styles="{top: '20px'}" :footer-hide="true">
          <Form :model="formItem" :label-width="80">
            <FormItem label="付款日期">
              <Row>
                <Col span="11">
                  <DatePicker type="date" placeholder="选择收款日期" v-model="formItem.date"></DatePicker>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="付款金额">
              <Input v-model="formItem.money" type="number" placeholder="请输入付款金额" prefix="logo-usd"></Input>
            </FormItem>
            <FormItem label="付款人">
              <Input v-model="formItem.name" placeholder="请输入付款人姓名"></Input>
            </FormItem>
            <FormItem label="付款账户">
              <Input v-model="formItem.account" placeholder="请输入付款账户"></Input>
            </FormItem>
            <FormItem label="付款条目">
              <Input
                v-model="formItem.list"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="请输入付款条目"
              ></Input>
            </FormItem>
            <FormItem label="备注">
              <Input v-model="formItem.remarks" placeholder="备注"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="add_pay()">新建</Button>
              <Button style="margin-left: 8px" @click="modal = false">取消</Button>
            </FormItem>
          </Form>
        </Modal>

        <Button type="success" shape="circle" @click="check()">批量审核</Button>
        <Button type="error" shape="circle" @click="del()">批量删除</Button>
      </div>
    </div>
    <hr class="common" />
    <div class="payee_table">
      <pay></pay>
    </div>
  </div>
</template>


<script>
import pay from "./table/pay_table";
import bus from "../reuse/bus";
export default {
  components: {
    pay
  },
  data() {
    return {
      modal: false,
      calculate: false,
      check_arr: "",
      del_arr: "",
      formItem: {
        date: "",
        money: "",
        name: "",
        account: "",
        list: "",
        remarks: ""
      },
      calculate_data: {
        date: "",
        code: "",
        money: ""
      }
    };
  },
  mounted() {
    bus.$on("pay_batch_check", msg => {
      this.check_arr = msg;
    });
    bus.$on("pay_batch_del", msg => {
      this.del_arr = msg;
    });
  },
  methods: {
    // add pay modal
    add_pay() {
      this.$Message.success("创建成功！");
      this.modal = false;
    },
    // calculate the payee
    calculate_pay() {},
    // check order
    // check() {
    //   //   alert(this.check_id);
    //   this.$http
    //     .get("http://192.168.2.229:9527/yuantu/mydept/stu/get/15130801")
    //     .then(res => {
    //       console.log(res);
    //     });
    // },
    // check order
    check() {
      var check_id = [];
      for (var i = 0; i < this.check_arr.length; i++) {
        check_id[i] = this.check_arr[i].id;
      }
      console.log(check_id);
      window.location.reload();
    },
    // payee batch del
    del() {
      var del_id = [];
      for (var i = 0; i < this.del_arr.length; i++) {
        del_id[i] = this.del_arr[i].id;
      }
      console.log(del_id);
      // window.location.reload();
    }
  }
};
</script>


<style scoped>
.header {
  width: 100%;
  height: auto;
  display: flex;
  margin-top: 0.5%;
}

.word {
  width: 20%;
  height: auto;
  font-size: 16px;
  color: black;
  margin-top: 0.3%;
}
.search {
  width: 30%;
  height: auto;
}

.button {
  width: 47%;
  height: auto;
  text-align: right;
  margin-right: 3%;
}

.common {
  margin: 5px 0;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
