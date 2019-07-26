<template>
  <div>
    <Tabs>
      <TabPane label="付款单">
        <pay></pay>
      </TabPane>
      <TabPane label="收款单">
        <payee></payee>
      </TabPane>
      <TabPane label="中转中心到达单">开发人员正在努力开发中~</TabPane>
      <TabPane label="入库单">开发人员正在努力开发中~</TabPane>
      <TabPane label="出库单">开发人员正在努力开发中~</TabPane>
      <TabPane label="中转单">开发人员正在努力开发中~</TabPane>
    </Tabs>
  </div>
</template>
<script>
import pay from "./table/pay";
import payee from "./table/payee";
export default {
  components: {
    pay,
    payee
  },
  data() {
    return {};
  }
};
</script>
c <style scoped>
</style>
