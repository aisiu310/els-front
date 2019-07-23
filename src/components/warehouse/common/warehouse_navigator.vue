<template>
  <div class="finance">
    <div class="navigator">
      <!-- <div class="divide"></div> -->
      <div class="work_list">
        <Menu :theme="theme" :width="100" :open-names="['2']" :accordion="true">
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
      <div class="employee_message">
        <div>
          <img src="../../../assets/employee.png" />
        </div>
        <p>{{user.employee_id}}</p>
        <p>{{user.employee_name}}</p>
        <p>{{user.employee_job}}</p>
        <p>{{user.employee_dept}}</p>
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
.finance {
  display: flex;
}

.navigator {
  width: 16%;
  background-color: white;
  margin-top: 1%;
  border-radius: 8px;
  box-shadow: #666 0px 0px 8px;
}

.work_list {
  width: 100%;
  height: auto;
  font-size: 16px;
  font-family: "宋体";
  color: black;
  text-align: center;
}

a {
  color: black;
}

.divide {
  width: 100%;
  height: 30px;
}

.employee_message {
  width: 100%;
  height: auto;
  font-size: 14px;
  color: black;
  text-align: center;
}

.content {
  width: 84%;
}
</style>
