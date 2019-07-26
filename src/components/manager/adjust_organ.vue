<template>
  <Tabs type="card">
    <TabPane icon="ios-add-circle" label="新增机构">
      <div style="background:#eee;padding: 20px; width: auto;">
        <Card :bordered="true">
          <addOrg></addOrg>
        </Card>
      </div>
    </TabPane>
    <TabPane icon="ios-list-box" label="机构列表"><orgTable></orgTable></TabPane>
  </Tabs>
</template>

<script>
import addOrg from "./form/add_org";
import orgTable from "./table/organization";
export default {
  components: {
    addOrg,
    orgTable
  }
};
</script>

<style scoped>
</style>
