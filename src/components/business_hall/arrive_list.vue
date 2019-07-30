<template>
  <div>
    <Tabs>
      <TabPane label="接收管理" icon="md-clipboard">
        <arriveListTable></arriveListTable>
      </TabPane>

      <TabPane label="历史记录" icon="ios-clock-outline">
        <img src="../../assets/B_G.png" width="100%" height="660px" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import arriveListTable from "./table/arrive_list_table";
export default {
  components: {
    arriveListTable
  },
  methods: {}
};
</script>

