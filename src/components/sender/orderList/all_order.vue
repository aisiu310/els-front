<template>
  <div class="body">
    <div class="left">
        <orderManage></orderManage>
    </div>
    <div class="right">1234567890</div>
  </div>
</template>

<script>
import orderManage from '../orderManage'
export default {
    components:{
        orderManage
    },
    data(){
        return{

        }
    }
};
</script>

<style scoped>
.body {
  width: 80%;
  height: auto;
  margin-left: 10%;
  margin-top: 1%;
  display: flex;
}

.left {
  width: 20%;
  height: auto;
}

.right {
  width: 80%;
  height: auto;
  background-color: antiquewhite
}
</style>
