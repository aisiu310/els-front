<template>
  <div>
    <div>
      <Tabs @on-click="showInventory">
        <TabPane label="航运区" icon="ios-jet" name="航运区">
          <inventory area="航运区"></inventory>
        </TabPane>
        <TabPane label="铁运区" icon="ios-train" name="铁运区">
          <inventory area="铁运区"></inventory>
        </TabPane>
        <TabPane label="汽运区" icon="ios-car" name="汽运区">
          <inventory area="汽运区"></inventory>
        </TabPane>
        <TabPane label="机动区" icon="ios-bicycle" name="机动区">
          <inventory area="机动区"></inventory>
        </TabPane>
      </Tabs>
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
    showInventory(name) {}
  }
};
</script>


<style scoped>
@import url("../warehouse_css/common.css");
</style>
