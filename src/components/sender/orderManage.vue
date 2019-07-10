<template>
  <div>
    <Menu :active-name="active" :open-names="['1']" :width="200">
      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-briefcase" />订单管理
        </template>
        <MenuItem name="1-1">全部订单</MenuItem>
        <MenuItem name="1-2">待取件</MenuItem>
        <MenuItem name="1-3">待派送</MenuItem>
        <MenuItem name="1-4">派送中</MenuItem>
        <MenuItem name="1-5">已签收</MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>

<script>
export default {
  data(){
    return{
      active:''
    }
  },
  mounted(){
    this.active = "1-1"
  }
};
</script>

