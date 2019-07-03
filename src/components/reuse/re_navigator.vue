<template>
  <div class="navigator">
    <div class="divide"></div>
    <div class="work_list">
      <ul>
        <li v-for="item in manager">
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
  </div>
</template>


<script>
export default {
  data() {
    return {
      employee_id: "",
      employee_name: "",
      employee_job: "",
      employee_dept: "",
      admin: [
        {
          text: "人员管理"
        }
      ],
      manager: [
          {
           text:"机构管理"   
          },
          {
           text:"薪酬调整"   
          },
          {
           text:"运费策略"   
          },
          {
           text:"审批单据"   
          },
          {
           text:"财务报表"   
          },
          {
           text:"查看日志"   
          }
      ]
    };
  },
  created() {
    this.employee_name = this.$route.query.user;
  }
};
</script>


<style scoped>
.work_list {
  width: 100%;
  height: auto;
  font-size: 20px;
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
  font-size: 16px;
  color: white;
  text-align: center;
}
</style>
