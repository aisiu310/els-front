<template>
  <div>
    <div class="header">
      <h></h>
    </div>
    <div>
      <router-view></router-view>
    </div>
    <div class="footer">2019/06-2019/07 &copy; 上甘岭</div>
  </div>
</template>

<script>
import h from "../reuse/re_header";
export default {
  components: {
    h
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  height: auto;
}

.footer {
  width: 100%;
  height: auto;
  margin-top: 0.5%;
  font-size: 16px;
  text-align: center;
}
</style>

