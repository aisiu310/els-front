<template>
  <div>
    <div class="header">
      <h></h>
    </div>
    <div class="content">
      <div class="aside">
        <n></n>
      </div>
      <div class="article">
        <ad></ad>
      </div>
    </div>
  </div>
</template>

<script>
import h from "../reuse/re_header";
import n from "../reuse/re_navigator";
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
.header {
  width: 100%;
  height: 118px;
}

.content {
  width: 100%;
  height: auto;
  display: flex;
}

.aside {
  width: 18%;
  height: auto;
  background-color: black;
}

.article {
  width: 82%;
  height: auto;
}
</style>

