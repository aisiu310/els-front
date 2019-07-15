<template>
  <div>
    <div class="top">
      <div class="word">库存盘点</div>
      <div class="middle">
        <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
      </div>
    </div>
    <hr />
    <div>
      <inventory time="123"></inventory>
    </div>
  </div>
</template>

<script>
import inventory from "../table/inventory";
export default {
  components: {
    inventory
  },
  data() {
    return {};
  },
  methods: {
  }
};
</script>

<style scoped>
@import url("../warehouse_css/common.css");
</style>


