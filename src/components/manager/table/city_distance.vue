<template>
  <div>
    <Table border :columns="columns" :data="data"></Table>
    <div class="page">
      <Page
        :total="total"
        :current="currentPage"
        size="small"
        show-total
        :page-size="pageSize"
        @on-change="changePage"
      />
    </div>
  </div>
</template>
<script>
import { api } from "../api/api";
import { url } from "../api/url";
export default {
  data() {
    return {
      total: 0,
      currentPage: 1,
      pageSize: 5,
      columns: [
        {
          title: "编号",
          key: "id"
        },
        {
          title: "出发城市",
          key: "beginCity"
        },
        {
          title: "到达城市",
          key: "endCity"
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
                "删除"
              )
            ]);
          }
        }
      ],
      data: [],
      showData: []
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    remove(index) {
      api
        .delData(url.distance_delURL, this.showData[index].id)
        .then(res => {
          console.log(res);
          if (res == 1) {
            this.$Message.success("删除成功！");
            this.initData();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    changePage(val) {
      this.showData = this.data.slice((val - 1) * 5, val * 5);
    },
    initData() {
      api.initData(url.distance_getURL).then(res => {
        if (res.length != null) {
          this.data = res;
          this.showData = res.slice(0, 5);
          this.total = res.length;
        }
      });
    }
  }
};
</script>
<style scoped>
.page {
  width: 100%;
  height: auto;
  text-align: right;
  padding: 10px;
}
</style>
