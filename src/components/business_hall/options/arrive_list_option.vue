<template>
  <div>
    <Button type="error" id="delete_button" @click="modaldelet = true">删除</Button>
    <Modal v-model="modaldelet" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>删除提醒</span>
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
      <Modal v-model="modal" title="添加" @on-ok="submitform()" @on-cancle="cancle">
        <Form :model="formItem" :label-width="80">
          <FormItem label="营业厅编号" prop="code">
            <Input v-model="formItem.code" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="到达日期" prop="arriveDate">
            <Row>
              <Col span="11">
                <DatePicker type="date" placeholder="Select date" v-model="formItem.arriveDate"></DatePicker>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="中转单编号" prop="transferId">
            <Input v-model="formItem.transferId" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="出发地" prop="placeOfDeparture">
            <Input v-model="formItem.placeOfDeparture" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="货物状态" prop="goodsState">
            <Input v-model="formItem.goodsState" placeholder="Enter something..."></Input>
          </FormItem>
        </Form>
      </Modal>
    </div>
    <div id="submit_for_check">
      <Button type="success" v-bind="sel" @click="submitforcheck(sel)">提交审核</Button>
    </div>
  </div>
</template>
<script>
import { api } from "../api";
export default {
  data() {
    return {
      modaldelet: false,
      modal_loading: false,
      modal: false,
      formItem: {
        code: this.businessHallCode,
        arriveDate: "2019-7-16",
        transferId: "111",
        placeOfDeparture: "拉文克劳",
        goodsState: "破损"
      },
      sel: this.$store.state.businessHallCode.selectInfo
    };
  },
  methods: {
    remove(sel) {
      let self = this;
      if (sel.length > 0) {
        self.modal_loading = true;
        api
          .arriveListRemove(sel)
          .then(response => {
            if (response.data.status === 200) {
              self.modal_loading = false;
              self.modaldelet = false;
              //更改vuex中monitOption信息，Option.vue中watch变化情况并发起刷新页面请求
              self.$store.commit("setMonitOption", response.data);
              self.$Message.success("删除成功");
            } else {
              self.$Message.warning(response.data.msg);
              self.modal_loading = false;
              self.modaldelet = false;
            }
          })
          .catch(error => {
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
      const self = this;
      self.$refs["formItem"].validate(valid => {
        if (valid) {
          api
            .arriveListSubmitForm(self.formItem)
            .then(response => {
              console.log(response);
              if (response.data.status) {
                //更改vuex中monitOption信息，Option.vue中watch变化情况并发起刷新页面请求
                self.$store.commit("setMonitOption", response.data);
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
        api
          .arriveListSubmitForCheck(list)
          .then(response => {
            console.log(response);
            if (response.data.status === 200) {
              //更改vuex中monitOption信息，Option.vue中watch变化情况并发起刷新页面请求
              self.$store.commit("setMonitOption", response.data);
              self.$Message.success("已提交审核");
            } else {
              self.$Message.warning(response.data.msg);
            }
          })
          .catch(error => {
            console.log(error);
            self.$Message.error("请求超时,请检查连接信息");
          });
      } else {
        self.$Message.error("你还没有选择");
      }
    }
  }
};
</script>

<style scoped>
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
