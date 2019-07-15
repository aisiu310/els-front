<template>
  <div>
    <div class="header">
      <h></h>
    </div>
    <div class="content">
      <n></n>
    </div>
  </div>
</template>

<script>
import h from "../../reuse/re_header";
import n from './warehouse_navigator'
export default {
  name: "warehouse_layout",
  components: {
    h,n
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 35px;
}

.content {
  width: 100%;
  height: auto;
}
</style>