<template>
  <div class="navigator">
    <div class="divide"></div>
    <div class="work_list">
      <ul>
        <li v-for="item in finance">
          <a>{{item.text}}</a>
        </li>
      </ul>
    </div>
    <div class="divide"></div>
    <div class="employee_message">
      <div>
        <img src="../../assets/employee.png" />
      </div>
      <p>{{employee_id}}</p>
      <p>{{employee_name}}</p>
      <p>{{employee_job}}</p>
      <p>{{employee_dept}}</p>
    </div>
    <div class="divide"></div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      employee_id: "1001",
      employee_name: "benny",
      employee_job: "CEO",
      employee_dept: "company",
      finance:[
          {
              text:'账户管理'
          },
          {
              text:'成本管理'
          },
          {
              text:'结算管理'
          },
          {
              text:'统计报表'
          },
          {
              text:'查看日志'
          }
      ]
    };
  },
  created() {
    // this.employee_name = this.$route.query.user;
  }
};
</script>


<style scoped>
.navigator{
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
</style>
