<template>
  <div class="add_city_body">
    <Form ref="city" :label-width="80">
      <FormItem label="开通新城市" prop="cityName">
        <Select v-model="cityName" filterable @on-change="judgeCity">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="addCity()">开通城市</Button>
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
      cityName: "",
      cityList: [
        {
          value: "南京",
          label: "南京"
        },
        {
          value: "上海",
          label: "上海"
        },
        {
          value: "北京",
          label: "北京"
        },
        {
          value: "杭州",
          label: "杭州"
        },
        {
          value: "广州",
          label: "广州"
        },
        {
          value: "深圳",
          label: "深圳"
        }
      ]
    };
  },
  methods: {
    addCity() {
      api.addCityByGet(url.city_addURL, this.cityName).then(res => {
        if (res == 1) {
          this.$Message.success("添加成功！");
        }
      });
    },
    judgeCity(val){
      api.addCityByGet(url.city_adjustURL, val).then(res => {
        if (res) {
          this.$Message.success("该城市已开通业务！");
          this.cityName = "";
        }
      });
    }
  }
};
</script>
<style>
.add_city_body {
  width: 50%;
  height: auto;
}
</style>
