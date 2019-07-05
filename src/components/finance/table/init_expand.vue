<template>
  <div>
    <Row class="expand-row">
      <Col span="8">
        <span class="expand-key">机构数量:</span>
        <span class="expand-value">{{ row.organization }}个</span>
      </Col>
      <Col span="8">
        <span class="expand-key">人员数量:</span>
        <span class="expand-value">{{ row.personnel }}人</span>
      </Col>
      <Col span="8">
        <span class="expand-key">车辆数量:</span>
        <span class="expand-value">{{ row.car }}辆</span>
      </Col>
    </Row>
    <Row>
      <Col span="8">
        <span class="expand-key">仓库数量:</span>
        <span class="expand-value">{{ row.inventory }}座</span>
      </Col>
      <Col span="8">
        <span class="expand-key">银行账号数量:</span>
        <span class="expand-value">{{ row.Bank_account }}个</span>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  props: {
    row: Object
  }
};
</script>

<style scoped>
.expand-row {
  margin-bottom: 16px;
}
</style>
