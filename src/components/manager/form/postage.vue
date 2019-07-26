<template>
  <div class="postage_body">
    <Form ref="postage" :model="postage" :label-width="80">
      <FormItem label="经济快递" prop="econ">
        <Input v-model="postage.econ" prefix="logo-usd" @on-enter="update"></Input>
      </FormItem>
      <FormItem label="普通快递" prop="common">
        <Input v-model="postage.common" prefix="logo-usd" @on-enter="update"></Input>
      </FormItem>
      <FormItem label="次晨特快" prop="fast">
        <Input v-model="postage.fast" prefix="logo-usd" @on-enter="update"></Input>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      postage: {
        econ: "",
        common: "",
        fast: ""
      }
    };
  },
  mounted() {},
  methods: {
    // get postage data
    getPostage() {},
    update(val) {
      alert(val);
    }
  }
};
</script>
<style scoped>
.postage_body {
  width: 50%;
  height: auto;
}
</style>
