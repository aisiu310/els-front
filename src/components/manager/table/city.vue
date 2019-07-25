<template>
  <div>
    <Table border :columns="columns" :data="data"></Table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "编号",
          key: "id"
        },
        {
          title: "城市",
          key: "cityName"
        },
        {
          title: "操作",
          key: "action",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "Delete"
              )
            ]);
          }
        }
      ],
      data: [
        {
          id: 18,
          cityName: "南京",
        },
        {
          id: 24,
          cityName: "上海",
        }
      ]
    };
  },
  methods: {
    remove(index) {
      this.data.splice(index, 1);
    }
  }
};
</script>
<style scoped>
</style>