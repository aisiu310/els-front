<template>
  <div>
    <div id="bussiness">
        <bussiness></bussiness>
    </div>
    <div id="benefit">
        <benefit></benefit>
    </div>
  </div>
</template>
<script>
import bussiness from "../finance/graph/business_graph";
import benefit from "../finance/graph/cost_benefit";
export default {
  components: {
    bussiness,
    benefit
  }
};
</script>
<style scoped>
</style>
