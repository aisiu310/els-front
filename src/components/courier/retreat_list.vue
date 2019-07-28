<template>
  <div>
    <Tabs>
      <TabPane label="退件单" icon="ios-paper-plane">
        <Row>
          <div style="background:#eee;padding: 20px">
            <Table :columns="columns" :data="data"></Table>
            <div :style="{float: 'right', margin: '5px'}">
              <Button size="small" @click="submit()">确认退件</Button>
            </div>
          </div>
        </Row>
      </TabPane>
      <TabPane label="历史记录" icon="ios-clock-outline">
        <p>等待程序员小哥开发</p>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import { api } from "./api";
export default {
  data() {
    return {
      data: "",
      data1: "",
      columes: [
        {
          title: "Name",
          key: "name"
        }
      ]
    };
  },
  methods: {
    submit(sel) {
      const self = this;
      var list = [];
      if (sel.length > 0) {
        sel.forEach(element => {
          if (element.state === 0) {
            list.push(element.id);
          }
        });
        api
          .receiptListSubmitForCheck(list)
          .then(response => {
            if (response.data.status === 200) {
              self.getReceiptList(self.currentPage, self.pageSize);
              self.$Message.success("提交成功");
            } else {
              self.$Message.error("提交失败");
            }
          })
          .catch(function(error) {
            self.$Message.error("请求超时,请检查连接信息");
          });
      } else {
        self.$Message.error("你还没有选择");
      }
    }
  }
};
</script>
<style>
</style>
