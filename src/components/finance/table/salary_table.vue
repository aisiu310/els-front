<template>
  <div class="body">
    <div class="header">
      <div class="word">工资表</div>
      <div class="search"></div>
      <div class="button">
        <Button type="primary">
          <Icon type="ios-calculator" size="16" />工资结算
        </Button>
        <Button type="error">
          <Icon type="ios-trash" size="16" />批量删除
        </Button>
      </div>
    </div>
    <hr class="common" />
    <div class="select">
      <Cascader :data="data" v-model="value1" @on-change="organization"></Cascader>
    </div>

    <Table
      border
      :columns="columns"
      :data="salary"
      @on-select="batchSelect"
      @on-select-cancel="batchSelect"
      @on-select-all-cancel="batchSelect"
      @on-select-all="batchSelect"
    ></Table>
    <div class="alonePage">
      <Page :total="dataLength" :current="currentPage" show-elevator @on-change="changePage" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataLength: 0,
      currentPage: 1,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "工号",
          key: "employeeId"
        },
        {
          title: "职位",
          key: "position"
        },
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "月份",
          key: "month",
          sortable: true
        },
        {
          title: "基础工资",
          key: "salary",
          sortable: true
        },
        {
          title: "提成",
          key: "royalty"
        },
        {
          title: "奖金",
          key: "bonus"
        },
        {
          title: "总计",
          key: "total"
        },
        {
          title: "操作",
          key: "action",
          width: 130,
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
      salary: [
        {
          employeeId: 10086,
          position: "财务",
          name: "John Brown",
          month: "2019.06",
          salary: 5000,
          royalty: 0,
          bonus: 600,
          total: 5600
        },
        {
          employeeId: 10001,
          position: "总经理",
          name: "John Brown",
          month: "2019.06",
          salary: 10000,
          royalty: 0,
          bonus: 1000,
          total: 11000
        },
        {
          employeeId: 10086,
          position: "快递员",
          name: "John Brown",
          month: "2019.06",
          salary: 3000,
          royalty: 3000,
          bonus: 500,
          total: 6500
        },
        {
          employeeId: 10086,
          position: "仓库管理员",
          name: "John Brown",
          month: "2019.06",
          salary: 5000,
          royalty: 0,
          bonus: 300,
          total: 5300
        }
      ],
      value1: ["beijing", "gugong"],
      data: [
        {
          value: "beijing",
          label: "北京",
          children: [
            {
              value: "gugong",
              label: "故宫"
            },
            {
              value: "tiantan",
              label: "天坛"
            },
            {
              value: "wangfujing",
              label: "王府井"
            }
          ]
        }
      ]
    };
  },
  methods: {
    update(index) {
      this.$Modal.info({
        title: "User Info",
      });
    },
    remove(index) {
      this.salary.splice(index, 1);
    },
    organization(value, selectedData) {
      // alert(value);
    },
    changePage(val) {},
    batchSelect(selection, row){}
  }
};
</script>

<style scoped>
@import url("../css/finance.css");
</style>
