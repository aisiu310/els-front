<template>
  <div>
    <div class="header">
      <div class="word">操作日志</div>
      <div class="search">
        <div>
          <Input
            search
            v-model="search_value"
            enter-button="搜索"
            placeholder="搜索操作日志信息"
            @on-search="search(search_value)"
          />
        </div>
      </div>
    </div>
    <hr class="common" />
    <div>
      <Table border :columns="columns" :data="log"></Table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search_value: "",
      columns: [
        {
          title: "编号",
          key: "id"
        },
        {
          title: "工号",
          key: "job_number"
        },
        {
          title: "操作人",
          key: "name"
        },
        {
          title: "操作行为",
          key: "action",
          ellipsis: true,
          tooltip: true
        },
        {
          title: "操作时间",
          key: "log_time",
          sortable: true
        },
        {
          title: "Action",
          key: "action",
          width: 100,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "View"
              )
            ]);
          }
        }
      ],
      log: [
        {
          id: "132465",
          job_number: "asd1234156",
          name: "Michael",
          action: "新建付款单",
          log_time: "2019-07-08 14:21"
        },
        {
          id: "132465",
          job_number: "asd1234156",
          name: "Michael",
          action: "新建付款单新建付款单新建付款单新建付款单新建付款单新建付款单新建付款单",
          log_time: "2019-07-08 14:21"
        },
        {
          id: "132465",
          job_number: "asd1234156",
          name: "Michael",
          action: "新建付款单",
          log_time: "2019-07-08 14:21"
        },
        {
          id: "132465",
          job_number: "asd1234156",
          name: "Michael",
          action: "新建付款单",
          log_time: "2019-07-08 14:21"
        }
      ]
    };
  },
  methods: {
    search(val) {
      alert("waiting the result");
    },
    show(index) {
      this.$Modal.info({
        title: "操作日志",
        content: `工号：${this.log[index].job_number}<br>姓名：${this.log[index].name}<br>操作行为：${this.log[index].action}<br>操作时间：${this.log[index].log_time}`
      });
    }
  }
};
</script>


<style scoped>
.header {
  width: 100%;
  height: auto;
  display: flex;
  margin-top: 0.5%;
}
.word {
  width: 30%;
  height: auto;
  font-size: 16px;
  color: black;
  margin-top: 0.3%;
}
.search {
  width: 70%;
  height: auto;
  text-align: center;
}

.search div {
  width: 80%;
  height: auto;
}
.common {
  margin: 5px 0;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
