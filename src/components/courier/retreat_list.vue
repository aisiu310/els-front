<template>
  <div>
    <Tabs>
      <TabPane label="退件单" icon="ios-paper-plane">
        <Transfer
          :data="data"
          :target-keys="targetdata"
          :list-style="listStyle"
          :render-format="render3"
          :operations="['一键退件']"
          filterable
          @on-change="handleChange3"
        >
          <div :style="{float: 'right', margin: '5px'}">
            <Button size="small" @click="submit(targetdata)">确认揽件</Button>
          </div>
        </Transfer>
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
      data: this.getOrderlist(),
      targetdata: this.getTargetKeys(),
      listStyle: {
        width: "650px",
        height: "600px"
      }
    };
  },
  methods: {
    getOrderlist() {
      let mockData = [];
      for (let i = 1; i <= 20; i++) {
        mockData.push({
          key: i.toString(),
          label: "新订单 " + i,
          description: "新订单来自"
        });
      }
      return mockData;
    },
    getTargetKeys() {
      return this.getOrderlist()
        .filter(() => Math.random() * 2 > 1)
        .map(item => item.key);
    },
    handleChange3(newTargetKeys) {
      this.targetKeys3 = newTargetKeys;
    },
    render3(item) {
      return item.label + " - " + item.description;
    },
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
