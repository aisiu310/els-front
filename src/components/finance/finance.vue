<template>
  <div>
    <div class="header">
      <h></h>
    </div>
    <div class="content">
      <!-- <div class="aside">
        <n></n>
      </div> -->
      <!-- <div class="article">
        <sa></sa>
      </div>-->
      <n></n>
    </div>
  </div>
</template>


<script>
import h from "../reuse/re_header";
import n from "./finance_navigator";
// import sa from './settle_account'
export default {
  components: {
    h,
    n
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
  /* display: flex; */
}

/* .aside {
  width: 15%;
  height: auto;
  background-color: black;
}

.article {
  width: 85%;
  margin-top: 1%;
  height: auto;
} */
</style>
