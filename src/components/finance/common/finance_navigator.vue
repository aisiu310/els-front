<template>
  <div class="finance">
    <div class="navigator">
      <!-- <div class="divide"></div> -->
      <div class="work_list">
        <Menu :theme="theme" :width="width" :accordion="true">
          <Submenu name="1">
            <template slot="title">账户管理</template>
            <MenuItem name="1-1" to="/finance/init">初期建账</MenuItem>
            <MenuItem name="1-2" to="/finance/bank">账号管理</MenuItem>
          </Submenu>
          <MenuItem name="2" to="/finance/payee">营收管理</MenuItem>
          <Submenu name="3">
            <template slot="title">成本管理</template>
            <MenuItem name="3-1" to="/finance/pay">付款单</MenuItem>
            <MenuItem name="3-2" to="/finance/salary">工资结算</MenuItem>
            <MenuItem name="3-3" to="/finance/rent">租金结算</MenuItem>
            <MenuItem name="3-4" to="/finance/freight">运费结算</MenuItem>
          </Submenu>
          <Submenu name="4">
            <template slot="title">统计报表</template>
            <MenuItem name="4-1" to="/finance/business_graph">经营情况表</MenuItem>
            <MenuItem name="4-2" to="/finance/cost_benefit">成本收益表</MenuItem>
          </Submenu>
          <MenuItem name="5" to="/finance/log">查看日志</MenuItem>
        </Menu>
        <!-- <Menu :theme="theme" :width="width" :accordion="true">
          <MenuItem
            :v-bind="menuItem"
            v-for="(item, index) in menuItem[0].children"
            :name="item.meta.title"
            :to="menuItem[0].path +'/'+ item.path"
            :key="item.meta.title"
          >{{item.meta.title}}
          <Submenu v-bind="menuItem" v-if="menuItem[0].children.length != 0"></Submenu>
          </MenuItem>
        </Menu> -->
      </div>
      <div class="divide"></div>
    </div>

    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: "light",
      width: "100%",
      menuItem: ""
    };
  }
};
</script>


<style scoped>
@import url("../css/finance.css");
</style>
