<template>
  <div class="body">
    <div class="header">
      <div class="word">租金</div>
      <div class="search"></div>
      <div class="button">
        <Button type="primary">
          <Icon type="ios-calculator" size="16" />租金结算
        </Button>
        <Button type="error">
          <Icon type="ios-trash" size="16" />批量删除
        </Button>
      </div>
    </div>
    <hr class="common" />
    <div class="select">
      <Select v-model="selectCity" prefix="ios-home" style="width:150px" @on-change="organization">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
    <Table
      border
      :columns="columns"
      :data="rent"
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
          title: "编号",
          key: "id"
        },
        {
          title: "机构名称",
          key: "name"
        },
        {
          title: "隶属",
          key: "belong"
        },
        {
          title: "租金",
          key: "rent"
        },
        {
          title: "地址",
          key: "address",
          tooltip: true
        },
        {
          title: "期限（/年）",
          width: 120,
          key: "lease"
        },

        {
          title: "到期时间",
          key: "due"
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
      rent: [
        {
          id: "025001",
          name: "秦淮区",
          belong: "南京",
          rent: 5000,
          address: "New York No. 1 Lake Park",
          lease: 3,
          due: "2019-07-23"
        },
        {
          id: "025002",
          name: "雨花台区",
          belong: "南京",
          rent: 5000,
          address: "New York No. 1 Lake Park",
          lease: 3,
          due: "2019-07-23"
        },
        {
          id: "025003",
          name: "鼓楼区",
          belong: "南京",
          rent: 5500,
          address: "New York No. 1 Lake Park",
          lease: 3,
          due: "2019-07-23"
        }
      ],
      cityList: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        }
      ],
      selectCity: ""
    };
  },
  methods: {
    update(index) {
      this.$Modal.info({
        title: "User Info"
      });
    },
    remove(index) {
      this.rent.splice(index, 1);
    },
    changePage(val) {},
    batchSelect(selection, row){},
    organization(selectCity){
      // alert(selectCity);
      console.log(this.selectCity);
    }
  }
};
</script>

<style scoped>
@import url("../css/finance.css");
</style>
