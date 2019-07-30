<template>
  <div class="header">
    <div class="logo">Express System</div>
    <div class="search"></div>
    <div class="username">
      {{organizationName}}&nbsp;/&nbsp;{{userName}}
      <Icon type="md-exit" size="20" @click="exit()" />
    </div>
  </div>
</template>

<script>
import store from "../../store/index";
export default {
  data() {
    return {
      userName: "",
      organizationName: ""
    };
  },
  mounted() {
    this.userName = sessionStorage.getItem("userName");
    this.organizationName = sessionStorage.getItem("organizationName");
    // invoke the back-end API in order to get An unapproved order
  },
  methods: {
    exit() {
      this.$router.push("/");
      store.commit("delToken");
    }
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 35px;
  display: flex;
  border-radius: 8px;
  background-color: dodgerblue;
  box-shadow: #666 0px 0px 8px;
}

.logo {
  width: 28%;
  font-size: 20px;
  font-family: "隶书";
  color: white;
  margin-left: 2%;
}

.search {
  width: 50%;
  font-size: 20px;
  color: white;
  text-align: center;
}

.username {
  width: 20%;
  font-size: 16px;
  margin-top: 0.5%;
  color: white;
}
</style>
