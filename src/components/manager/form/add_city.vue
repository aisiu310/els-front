<template>
  <div class="add_city_body">
    <Form ref="city" :model="city" :label-width="80">
      <FormItem label="开通新城市" prop="model">
        <Select v-model="city.model" filterable>
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('city')">开通城市</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      city: {
        model: ""
      },
      cityList: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        },
        {
          value: "Sydney",
          label: "Sydney"
        },
        {
          value: "Ottawa",
          label: "Ottawa"
        },
        {
          value: "Paris",
          label: "Paris"
        },
        {
          value: "Canberra",
          label: "Canberra"
        }
      ]
    };
  },
  methods: {}
};
</script>
<style>
.add_city_body {
  width: 50%;
  height: auto;
}
</style>
