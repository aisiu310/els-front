<template>
  <div>
    <div class="header">
      <div class="word">成本结算（付款单）</div>
      <!-- search box -->
      <div class="search">
        <Input
          search
          v-model="payee_value"
          @on-search="payee_search(payee_value)"
          placeholder="收款单查询"
          :maxlength="32"
        />
      </div>
      <div class="divide"></div>
      <div class="button">
        <Button type="success" shape="circle" @click="modal = true">新建收款单</Button>
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
      </div>
    </div>
    <Divider class="common" />
    <div class="payee_table">
        
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      payee_value: "",
      modal: false,
      formItem: {
        code: "",
        date: "",
        money: "",
        courier: "",
        orderList: ""
      }
    };
  },
  methods: {
    // search payee
    payee_search(payee_value) {
      // invoke the back-end search payee API
    },
    // add payee modal
    add_payee() {
      this.modal = false;
      this.$Message.success("创建成功！");
      var time = this.formItem.date;
      var t = time.toString();
      console.log(t);
    }
  }
};
</script>


<style scoped>
.header {
  width: 100%;
  height: auto;
  display: flex;
}

.word {
  width: 30%;
  height: auto;
  font-size: 16px;
  color: black;
  text-align: center;
}
.search {
  width: 30%;
  height: auto;
}

.divide {
  width: 25%;
  height: auto;
}

.button {
  width: 15%;
  height: auto;
}

.common{
    margin: 5px 0;
}
</style>
