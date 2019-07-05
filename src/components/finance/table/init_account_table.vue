<template>
  <div>
    <Table :columns="columns" :data="data"></Table>
  </div>
</template>

<script>
import expandRow from "./init_expand";
export default {
  data() {
    return {
      columns: [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            });
          }
        },
        {
          title: "编号",
          key: "id"
        },
        {
          title: "创建日期",
          key: "date"
        },
        {
          title: "账本名称",
          key: "name"
        },
        {
          title: "操作",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.update(params.index);
                    }
                  }
                },
                "修改"
              ),
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
      data: [
        {
          id: "00001",
          date: "2019/07/05",
          name: "上甘岭2019账本",
          organization: 16,
          personnel: 300,
          car: 150,
          inventory: 6,
          Bank_account: 10
        }
      ]
    };
  },
  methods: {
    show(index) {
      this.$Modal.info({
        title: this.data.name,
        content: `编号:${this.data[index].id}<br>创建日期：${this.data[index].date}<br>账本名称：${this.data[index].name}<br>机构数量：${this.data[index].organization}个<br>人员数量：${this.data[index].personnel}人<br>车辆数量：${this.data[index].car}辆<br>仓库数量：${this.data[index].inventory}座<br>银行账号数量：${this.data[index].Bank_account}个`
      });
    },
    // del payee and get the data which is from back-end
    remove(index) {
      this.$Message.error("初始账本无法被删除！");
    },
    update(index) {
      this.$Message.error("对不起，您当前没有权限修改初始账本信息！");
    }
  }
};
</script>

<style scoped>
</style>
