<template>
  <div class="body">
    <div class="header">
      <div class="word">运费</div>
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
    <Table
      border
      :columns="columns"
      :data="freight"
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
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address"
        },{
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address"
        },
        {
          title: "Action",
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
              )
            ]);
          }
        }
      ],
      freight: []
    };
  },
  moounted(){
    this.$Message.error("运费合计尚未开发！请等待开发人员开发~")
  },
  methods: {
    update(index) {
      this.$Modal.info({
        title: "User Info"
      });
    },
    remove(index) {
      this.data6.splice(index, 1);
    },
    changePage(val) {},
    batchSelect(selection, row){}
  }
};
</script>

<style scoped>
@import url("../css/finance.css");
</style>
