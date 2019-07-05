<template>
  <div>
    <div class="header">
      <div class="word">结算管理（收款单）</div>
      <!-- search box -->
      <div class="search">

      </div>
      <div class="button">
        <Button type="primary" shape="circle" @click="calculate = true">收款结算</Button>
        <!-- calculate payee modal -->
        <Modal title="收款结算" v-model="calculate" :styles="{top: '20px'}" :footer-hide="true">
          <Form :model="calculate_data" :label-width="80">
            <FormItem label="收款日期">
              <Row>
                <Col span="11">
                  <DatePicker type="date" placeholder="选择收款日期" v-model="formItem.date"></DatePicker>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="所属营业厅">
              <Select v-model="formItem.code" placeholder="请选择所属营业厅">
                <Option value="001">鼓楼区</Option>
                <Option value="002">雨花台区</Option>
                <Option value="003">秦淮区</Option>
              </Select>
            </FormItem>
            <FormItem label="总金额">
              <Input
                v-model="formItem.money"
                type="number"
                placeholder="收款总金额"
                prefix="logo-usd"
                :disabled="true"
              ></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="calculate_payee()">计算收款金额</Button>
              <Button style="margin-left: 8px" @click="calculate = false">退出</Button>
            </FormItem>
          </Form>
        </Modal>

        <Button type="primary" shape="circle" @click="modal = true">新建收款单</Button>
        <!-- add payee modal -->
        <Modal title="新建收款单" v-model="modal" :styles="{top: '20px'}" :footer-hide="true">
          <Form :model="formItem" :label-width="80">
            <FormItem label="所属营业厅">
              <Select v-model="formItem.code" placeholder="请选择所属营业厅">
                <Option value="001">鼓楼区</Option>
                <Option value="002">雨花台区</Option>
                <Option value="003">秦淮区</Option>
              </Select>
            </FormItem>
            <FormItem label="收款日期">
              <Row>
                <Col span="11">
                  <DatePicker type="date" placeholder="选择收款日期" v-model="formItem.date"></DatePicker>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="金额">
              <Input
                v-model="formItem.money"
                type="number"
                placeholder="请输入收款总金额"
                prefix="logo-usd"
              ></Input>
            </FormItem>
            <FormItem label="收款快递员">
              <Input v-model="formItem.courier" placeholder="请输入收款快递员姓名"></Input>
            </FormItem>
            <FormItem label="收款订单号">
              <Input
                v-model="formItem.orderList"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="请输入收款的订单号，以逗号分割"
              ></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="add_payee()">新建</Button>
              <Button style="margin-left: 8px" @click="modal = false">取消</Button>
            </FormItem>
          </Form>
        </Modal>

        <Button type="success" shape="circle" @click="check()">批量审核</Button>
        <Button type="error" shape="circle" @click="del()">批量删除</Button>

      </div>
    </div>
    <Divider class="common" />
    <div class="payee_table">
      <payee></payee>
    </div>
  </div>
</template>


<script>
import payee from "./table/payee_table";
import bus from '../reuse/bus';
export default {
  components: {
    payee
  },
  data() {
    return {
      modal: false,
      calculate: false,
      // the parameter of batch approval
      check_arr: '',
      // the parameter of batch del
      del_arr: '',
      formItem: {
        code: "",
        date: "",
        money: "",
        courier: "",
        orderList: ""
      },
      calculate_data: {
        date: "",
        code: "",
        money: ""
      }
    };
  },
  mounted() {
    bus.$on("payee_batch_check", msg => {
      this.check_arr = msg;
    });
    bus.$on("payee_batch_del", msg => {
      this.del_arr = msg;
    });
  },
  methods: {
    // add payee modal
    add_payee() {
      this.modal = false;
      this.$Message.success("创建成功！");
      var time = this.formItem.date;
      var t = time.toString();
      console.log(t);
    },
    // calculate the payee
    calculate_payee() {},
    // check order
    check(){
      var check_id = [];
      for(var i = 0; i < this.check_arr.length; i++){
        check_id[i] = this.check_arr[i].id;
      }
      console.log(check_id);
      window.location.reload();
    },
    // payee batch del
    del(){
      var del_id = [];
      for(var i = 0; i < this.del_arr.length; i++){
        del_id[i] = this.del_arr[i].id;
      }
      console.log(del_id);
      window.location.reload();
    }
  }
};
</script>


<style scoped>
.header {
  width: 100%;
  height: auto;
  display: flex;
  margin-top: .5%
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
  margin-right: 3%
}

.common {
  margin: 5px 0;
}
</style>
