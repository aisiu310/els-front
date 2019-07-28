<template>
  <div class="body">
    <div class="left">
      <Menu :active-name="active" :open-names="['1']" :width="width">
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-briefcase" />订单管理
          </template>
          <MenuItem name="1-1" to="/sender/orderManage/order_table">全部订单</MenuItem>
          <MenuItem name="1-2" to="/sender/orderManage/order_table">派送中</MenuItem>
          <MenuItem name="1-3" to="/sender/orderManage/order_table">已签收</MenuItem>
        </Submenu>
      </Menu>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import bus from "../../reuse/bus";
export default {
  data() {
    return {
      active: "",
      width: "200"
    };
  },
  mounted() {
    bus.$on("sendChoice", res => {
      this.active = res;
    });
  }
};
</script>


<style scoped>
@import url("../css/sender.css");
</style>

