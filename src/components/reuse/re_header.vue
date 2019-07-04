<template>
  <div class="header">
    <div class="logo">Express System</div>
    <div class="search" v-if="username !== 'manager'">
      <!-- <Input v-model="search_value" placeholder="Enter something..." style="width: 400px" />
      <Button type="primary" shape="circle" icon="ios-search" @click="search()">Search</Button> -->
    </div>

    <div class="search" v-if="username === 'manager'">
      <!-- 当前共有{{check}}条记录待审核！
      <Button type="info" shape="circle">立即审核</Button> -->
    </div>

    <div class="username">
      {{username}}
      <Icon type="md-exit" size="20" @click="exit()" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search_value: "",
      username: "11111111111",
      check:''
    };
  },
  mounted() {
    // this.username = this.$route.params.user;
    // invoke the back-end API in order to get An unapproved order
    this.check = "123";
  },
  methods: {
    search() {
      // invoke the back-end API
      this.$Message.success("test!");
    },
    exit() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 35px;
  display: flex;
  background-color: black;
}

.logo {
  width: 28%;
  font-size: 20px;
  font-family: '隶书';
  color: white;
  margin-left: 2%
}

.search {
  width: 60%;
  font-size: 20px;
  color: white;
  text-align: center
}

.username {
  width: 10%;
  font-size: 16px;
  margin-top: .5%;
  color: white;
}
</style>
