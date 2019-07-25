<template>
  <div class="menu_body">
    <div class="menu_content" @click="addEmployee()">
      <div>
        <Icon type="md-person-add" size="72" />
        <br />新增员工
      </div>
    </div>
    <div class="menu_content" @click="employeeList()">
      <div>
        <Icon type="ios-list-box" size="72" />
        <br />员工列表
      </div>
    </div>
    <div class="menu_content" @click="allocate()">
      <div>
        <Icon type="md-finger-print" size="72" />
        <br />权限分配
      </div>
    </div>
    <div class="menu_content" @click="waitDev()">
      <div>
        <Icon type="ios-more" size="72" />
        <br />等待开发
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    addEmployee() {
      this.$Message.info("开发人员正在努力扩展~");
    },
    employeeList() {
      this.$Message.info("开发人员正在努力扩展~");
    },
    allocate() {
      this.$Message.info("开发人员正在努力扩展~");
    },
    waitDev() {
      this.$Message.info("开发人员正在努力扩展~");
    }
  }
};
</script>

<style scoped>
@import url("../css/admin.css");
</style>

