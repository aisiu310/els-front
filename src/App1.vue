<template>
  <div class="menu_body">
    <div class="men_content">
      <div @click="addEmployee()">
        <Icon type="md-person-add" size="72" />
        <br />新增员工
      </div>
    </div>
    <div class="men_content">
      <div @click="employeeList()">
        <Icon type="ios-list-box" size="72" />
        <br />员工列表
      </div>
    </div>
    <div class="men_content">
      <div @click="allocate()">
        <Icon type="md-finger-print" size="72" />
        <br />权限分配
      </div>
    </div>
    <div class="men_content">
      <div @click="waitDev()">
        <Icon type="ios-more" size="72" />
        <br />等待开发
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    addEmployee() {},
    employeeList() {},
    allocate() {},
    waitDev() {
      this.$Message.info("开发人员正在努力扩展~");
    }
  }
};
</script>

<style scoped>
.menu_body {
  width: 100%;
  height: 400px;
  display: flex;
  background-color: #eee;
}

.men_content {
  width: 20%;
  height: 200px;
  text-align: center;
  border-radius: 30px;
  margin-top: 100px;
  margin-left: 4%;
  background-color: white;
}

.men_content div {
  width: 50%;
  margin-left: 25%;
  margin-top: 20%;
  text-align: center;
}
</style>

