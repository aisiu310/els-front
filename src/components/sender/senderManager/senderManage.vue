<template>
  <div class="body">
    <div class="left">
      <Menu :active-name="active" :open-names="['2']" :width="200">
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-people" />账户管理
          </template>
          <MenuItem name="2-1" to="/sender/senderManage/person">基本信息</MenuItem>
          <MenuItem name="2-2" to="/sender/senderManage/address">地址管理</MenuItem>
          <MenuItem name="2-3" to="/sender/senderManage/password">密码修改</MenuItem>
        </Submenu>
      </Menu>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import bus from '../../reuse/bus'
export default {
  data() {
    return {
      active:''
    };
  },
  mounted() {
    bus.$on("sendChoice", res => {
      this.active = res;
    });
  },
  methods: {
    show() {
      this.$Message.error("开发人员正在努力开发中~");
    }
  }
};
</script>



<style scoped>
.body {
  width: 80%;
  height: auto;
  margin-left: 10%;
  margin-top: 1%;
  display: flex;
}

.left {
  width: 20%;
  height: auto;
}

.right {
  width: 80%;
  height: auto;
}
</style>