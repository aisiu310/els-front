<template>
  <div class="finance">
    <div class="navigator">
      <!-- <div class="divide"></div> -->
      <div class="work_list">
        <Menu :theme="theme" :width="width" :open-names="['2']" :accordion="true">
          <MenuItem name="1" to="/warehouse/show">库存展示</MenuItem>
          <Submenu name="2">
            <template slot="title">出/入库管理</template>
            <MenuItem name="2-1" to="/warehouse/out_warehouse">出库</MenuItem>
            <MenuItem name="2-2" to="/warehouse/in_warehouse">入库</MenuItem>
          </Submenu>
          <MenuItem name="3" to="/warehouse/check">库存盘点</MenuItem>
          <MenuItem name="4" to="/warehouse/warn">库存警戒线</MenuItem>
        </Menu>
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
      width: "100",
      user: {
        employee_id: "1001",
        employee_name: "benny",
        employee_job: "CEO",
        employee_dept: "company"
      }
    };
  },
  created() {
    // this.employee_name = this.$route.query.user;
  }
};
</script>


<style scoped>
@import url("../warehouse_css/common.css");
</style>
