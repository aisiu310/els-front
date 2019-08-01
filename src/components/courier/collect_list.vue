<template>
  <div>
    <Tabs>
      <TabPane label="揽件单" icon="ios-paper-plane">
        <Row style="background:#eee;padding:20px">
          <Col span="11">
            <Card :bordered="false">
              <Table stripe border :columns="columns" :data="data" @on-selection-change="select">
                <template slot-scope="{ row, index }" slot="action">
                  <Button type="success" @click="submitforcheck()">揽件</Button>
                </template>
              </Table>
            </Card>
          </Col>
          <Col span="11" offset="2">
            <Card shadow>
              <Table stripe border :columns="columns1" :data="data1"></Table>
              <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                  <Page :total="sum" @on-change="changePage" show-elevator show-total></Page>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import { api } from "./api";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      modal: false,
      sel: [],
      data: [],
      data1: [],
      sum: 0,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "收件人所属区域",
          key: "senderRegion"
        },
        {
          title: "订单条形码号",
          key: "code"
        },
        {
          title: "快递员编号",
          key: "courierId"
        },
        {
          title: "快递员",
          key: "courierName"
        },
        {
          title: "操作",
          slot: "action"
        }
      ],
      columns1: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "收件人所属区域",
          key: "senderRegion"
        },
        {
          title: "订单条形码号",
          key: "code"
        },
        {
          title: "快递员编号",
          key: "courierId"
        },
        {
          title: "快递员",
          key: "courierName"
        }
      ]
    };
  },
  mounted() {
    this.getCollectList();
    this.getAleradyCollectList(this.currentPage, this.pageSize);
  },
  methods: {
    getAleradyCollectList(currentPage, pageSize) {
      const self = this;
      api
        .getAleradyCollectList(currentPage, pageSize)
        .then(response => {
          // console.log(response);
          if (response.data.status === 200) {
            self.data1 = response.data.data.list;
            self.sum = response.data.total;
          } else {
            self.$Message.error(response.data.msg);
          }
        })
        .catch(error => {
          self.$Message.error("请求超时");
        });
    },
    getCollectList() {
      const self = this;
      api
        .getCollectList()
        .then(response => {
          console.log(response);
          if (response.data.status === 200) {
            self.data = response.data.data;
          } else {
            self.$Message.error(response.data.msg);
          }
        })
        .catch(error => {
          self.$Message.error("请求超时");
        });
    },
    select(selection, row) {
      this.sel = selection;
    },
    submitforcheck() {
      const self = this;
      let sel = self.sel;
      // console.log(sel);
      if (sel.length > 0) {
        api
          .submitCollectListForCheck(sel)
          .then(response => {
            console.log(response);
            if (response.data.status === 200) {
              self.getCollectList();
              self.getAleradyCollectList(this.currentPage, this.pageSize);
              self.$Message.success("审核成功");
            } else {
              self.$Message.error(response.data.msg);
            }
          })
          .catch(error => {
            console.log(error);
            self.$Message.error("请求超时,请检查连接信息");
          });
      } else {
        self.$Message.error("你还没有选择");
      }
    },
    cancle() {
      this.$Message.info("取消操作");
    },
    changePage(page) {
      this.getAleradyCollectList(page, this.pageSize);
    }
  }
};
</script>
<style>
#delete_button {
  margin: 10px;
  float: left;
}
#arrive_list_add {
  border: 0px solid rebeccapurple;
  margin: 10px;
  width: auto;
  height: auto;
  float: left;
}
#submit_for_check {
  margin: 10px;
  width: auto;
  height: auto;
  float: left;
}
</style>
