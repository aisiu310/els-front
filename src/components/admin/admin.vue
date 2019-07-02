<template>
  <div>
      <h></h>
      <n></n>
      <div class="ad"><ad></ad></div>
  </div>
</template>

<script>
import h from "../reuse/re_header";
import n from "../reuse/Navigator";
import ad from "./admin_detail";
export default {
  components: {
    h,
    n,
    ad
  }
};
</script>

<style scoped>
n{  
    width: 30%;
    float: left;
    background-color: antiquewhite
}
.ad{
    width: 70%;
    float: left;
    background-color: aqua
}
</style>

