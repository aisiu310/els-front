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
          title: "出发城市",
          key: "startOne"
        },
        {
          title: "到达城市",
          key: "startTwo"
        },
        {
          title: "距离(KM)",
          key: "distance"
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
          startOne: "南京",
          startTwo: "上海",
          distance: 233
        },
        {
          id: 18,
          startOne: "南京",
          startTwo: "北京",
          distance: 988
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
