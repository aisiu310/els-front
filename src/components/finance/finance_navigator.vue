<template>
  <div class="finance">
    <div class="navigator">
      <div class="divide"></div>
      <div class="work_list">
        <ul>
          <li>账户管理</li>
          <li>
            <router-link to="/payee">成本管理</router-link>
          </li>
          <li>
            <router-link to="/pay">结算管理</router-link>
          </li>
          <li>统计报表</li>
          <li>查看日志</li>
        </ul>
      </div>
      <div class="divide"></div>
      <div class="employee_message">
        <div>
          <img src="../../assets/employee.png" />
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
  width: 15%;
  background-color: black;
}

.work_list {
  width: 100%;
  height: auto;
  font-size: 16px;
  font-family: "宋体";
  color: white;
  text-align: center;
}

a {
  color: white;
}

.divide {
  width: 100%;
  height: 30px;
}

.employee_message {
  width: 100%;
  height: auto;
  font-size: 14px;
  color: white;
  text-align: center;
}

.content {
  width: 85%;
}
</style>
