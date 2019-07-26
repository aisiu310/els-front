<template>
  <div class="postage_body">
    <Form ref="postage" :model="postage" :label-width="80">
      <FormItem label="经济快递" prop="econ">
        <Input v-model="postage.econ" prefix="logo-usd" @on-enter="updateEcon()"></Input>
      </FormItem>
      <FormItem label="普通快递" prop="common">
        <Input v-model="postage.common" prefix="logo-usd" @on-enter="updateCommon()"></Input>
      </FormItem>
      <FormItem label="次晨特快" prop="fast">
        <Input v-model="postage.fast" prefix="logo-usd" @on-enter="updateFast()"></Input>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { api } from "../api/api";
import { url } from "../api/url";
export default {
  data() {
    return {
      postage: {
        econ: "",
        common: "",
        fast: ""
      },
      postageList: []
    };
  },
  mounted() {
    this.getPostage();
  },
  methods: {
    // get postage data
    getPostage() {
      api.initData(url.postage_getURL).then(res => {
        if (res.length != 0) {
          this.postageList = res;
          this.postage.econ = res[0].fee;
          this.postage.common = res[1].fee;
          this.postage.fast = res[2].fee;
        }
      });
    },
    updateEcon() {
      let obj = { id: this.postageList[0].id, fee: this.postage.econ };
      api.updatePostage(url.postage_updateURL, obj).then(res => {
        if (res == 1) {
          this.$Message.success("修改成功！");
        }
      });
    },
    updateCommon() {
      let obj = { id: this.postageList[1].id, fee: this.postage.common };
      api.updatePostage(url.postage_updateURL, obj).then(res => {
        if (res == 1) {
          this.$Message.success("修改成功！");
        }
      });
    },
    updateFast() {
      let obj = { id: this.postageList[2].id, fee: this.postage.fast };
      api.updatePostage(url.postage_updateURL, obj).then(res => {
        if (res == 1) {
          this.$Message.success("修改成功！");
        }
      });
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
