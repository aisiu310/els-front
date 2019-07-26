<template>
  <div>
    <Table border :columns="columns" :data="showData"></Table>
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
          key: "id",
          width: 80
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
    this.initData(this.currentPage);
  },
  methods: {
    remove(index) {
      api.delData(url.city_delURL, this.showData[index].id).then(res => {
        if (res == 1) {
          this.$Message.success("删除成功！");
          this.initData();
        }
      });
    },
    initData() {
      api.initData(url.city_getURL).then(res => {
        if (res.length != 0) {
          this.data = res;
          this.total = res.length;
          this.showData = res.slice(0, 5);
        }
      });
    },
    changePage(val) {
      this.showData = this.data.slice((val - 1) * 5, val * 5);
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