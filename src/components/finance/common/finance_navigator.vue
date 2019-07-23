<template>
  <div class="finance">
    <div class="navigator">
      <!-- <div class="divide"></div> -->
      <div class="work_list">
        <Menu :theme="theme" :active-name="['4-1']" :width="100" :accordion="true">
          <Submenu name="1">
            <template slot="title">账户管理</template>
            <MenuItem name="1-1" to="/finance/init">初期建账</MenuItem>
            <MenuItem name="1-2" to="/finance/bank">账号管理</MenuItem>
          </Submenu>
          <MenuItem name="2" to="/finance/payee">结算管理</MenuItem>
          <Submenu name="3">
            <template slot="title">成本管理</template>
            <MenuItem name="3-1" to="/finance/pay">付款单</MenuItem>
            <MenuItem name="3-2" to="/finance/salary">工资</MenuItem>
            <MenuItem name="3-3" to="/finance/rent">租金</MenuItem>
            <MenuItem name="3-4" to="/finance/freight">运费</MenuItem>
          </Submenu>
          <Submenu name="4">
            <template slot="title">统计报表</template>
            <MenuItem name="4-1" to="/finance/business_graph">经营情况表</MenuItem>
            <MenuItem name="4-2" to="/finance/cost_benefit">成本收益表</MenuItem>
          </Submenu>
          <MenuItem name="5" to="/finance/log">查看日志</MenuItem>
        </Menu>
      </div>
      <div class="divide"></div>
      <!-- <div class="employee_message">
        <div>
          <img src="../../../assets/employee.png" />
        </div>
        <p>{{user.employee_id}}</p>
        <p>{{user.employee_name}}</p>
        <p>{{user.employee_job}}</p>
        <p>{{user.employee_dept}}</p>
      </div>-->
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
