<template>
  <div class="add_city_distance_body">
    <Form ref="cityDistance" :model="cityDistance" :label-width="80">
      <FormItem label="出发城市" prop="startOne">
        <Select v-model="cityDistance.startOne" filterable>
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="到达城市" prop="startTwo">
        <Select v-model="cityDistance.startTwo" filterable>
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="距离(KM)" prop="distance">
        <Input v-model="cityDistance.distance" placeholder="请输入两城市之间的距离" type="number" />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="add()">开通城市</Button>
        <Button @click="handleReset('cityDistance')" style="margin-left: 8px">重置</Button>
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
      cityDistance: {
        startOne: "",
        startTwo: "",
        distance: ""
      },
      cityList: []
    };
  },
  mounted() {
    this.getCityList();
  },
  methods: {
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    getCityList() {
      api.initData(url.city_getURL).then(res => {
        var city = [];
        if (res) {
          for (var i = 0; i < res.length; i++) {
            city[i] = { value: res[i].id, label: res[i].cityName };
          }
          this.cityList = city;
        }
      });
    },
    add() {
      api
        .addDistanceByGet(
          url.distance_addURL,
          this.cityDistance.startOne,
          this.cityDistance.startTwo,
          this.cityDistance.distance
        )
        .then(res => {
          if (res == 1) {
            this.$Message.success("添加成功！");
            this.handleReset("cityDistance");
          }
        });
    }
  }
};
</script>
<style scoped>
.add_city_distance_body {
  width: 50%;
  height: auto;
}
</style>
