<template>
  <div>
    <Tabs>
      <TabPane label="接收管理" icon="md-clipboard">
        <arriveListTable></arriveListTable>
        <arriveListOption></arriveListOption>
      </TabPane>

      <TabPane label="历史记录" icon="ios-clock-outline">
        <img src="../../assets/B_G.png" width="100%" height="660px" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import arriveListTable from "./table/arrive_list_table";
import arriveListOption from "./options/arrive_list_option";
export default {
  components: {
    arriveListTable,
    arriveListOption
  }
};
</script>

