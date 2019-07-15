<template>
  <div>
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
          <Slider v-model="warehouse_warn_line" show-input @on-change="setNewWarnLine"></Slider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      warehouse_capacity: 65,
      warehouse_warn_line: 0
    };
  },
  mounted() {
    this.warehouse_warn_line = 90;
  },
  methods: {
    setNewWarnLine(val) {
      var flag = confirm("是否确认修改？");
      if (flag == true) {
        this.warehouse_warn_line = val;
      } else {
        this.$Message.warning("取消修改！");
      }
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
