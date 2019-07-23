<template>
  <div class="body">
    <div class="top">
      <div class="word">库存警戒线</div>
    </div>
    <hr />
    <div class="warn_content">
      <p class="just_word">当前库存容量：{{warehouse_capacity}}%</p>
      <div class="top">
        <div>
          <label class="just_word">库存警戒线：</label>
        </div>
        <div class="lll">
          <Slider v-model="warehouse_warn_line" show-input @on-change="setWarnLine"></Slider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "../api/api"
export default {
  data() {
    return {
      warehouse_capacity: 0,
      warehouse_warn_line: 0
    };
  },
  mounted() {
    this.getCurrentCapacity("南京中转中心仓库");
    this.getCurrentWarnLine("南京中转中心仓库");
    if(this.warehouse_capacity > this.warehouse_warn_line){
      this.$Message.error("库存容量超出警戒线！");
    }
  },
  methods: {
    setWarnLine(val) {
      api.setInventoryLine("南京中转中心仓库", val).then(res=>{
          if(res == 1){
            this.$Message.success("设置成功！");
          }else{
            this.$Message.error("设置失败！");
          }
      })
    },
    // as function name
    getCurrentCapacity(inventoryName){
      api.getInventoryCapacity(inventoryName).then(res =>{
        this.warehouse_capacity = res;
      })
    },
    // as function name
    getCurrentWarnLine(inventoryName){
      api.getWarnLine(inventoryName).then(res =>{
        this.warehouse_warn_line = res;
      })
    }
  }
};
</script>


<style scoped>
@import url("../warehouse_css/common.css");
.lll {
  width: 80%;
}
</style>
