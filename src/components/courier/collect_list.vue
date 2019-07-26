<template>
  <div>
    <Tabs>
      <TabPane label="揽件单" icon="ios-paper-plane">
        <Transfer
          :data="date"
          :target-keys="targetdata"
          :list-style="listStyle"
          :render-format="render"
          :titles="['待派送','已揽件']"
          :operations="['一键退回','一键揽件']"
          filterable
          not-found-text
          @on-change="handleChange"
          @on-selected-change="selectKeys"
        >
          <div :style="{float: 'right', margin: '5px'}">
            <Button type="primary" size="small" v-bind="targetdata" @click="submit(targetdata)">派件确认</Button>
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
      currentPage: 1,
      pageSize: 10,
      sourceSelectedKeys: "",
      targetSelectedKeys: "",
      targetKey: "",
      date: "",
      targetdata: this.getTargetKeys(),
      listStyle: {
        width: "650px",
        height: "600px"
      }
    };
  },
  mounted() {
    this.getOrderlist(this.currentPage, this.pageSize);
  },
  methods: {
    getOrderlist(currentPage, pageSize) {
      const self = this;
      api
        .getCollectList(currentPage, pageSize)
        .then(response => {
          console.log(response);
          if (response.data.status === 200) {
            self.date = response.data.data.list;
          } else {
            self.$Message.error(response.data.msg);
          }
        })
        .catch(error => {
          self.$Message.error("请求超时");
        });
    },
    selectKeys(sourceSelectedKeys, targetSelectedKeys) {
      this.sourceSelectedKeys = sourceSelectedKeys;
      this.targetSelectedKeys = targetSelectedKeys;
    },
    getTargetKeys() {
      return this.targetSelectedKeys;
    },
    handleChange(newTargetKeys) {
      this.targetKey = newTargetKeys;
    },
    render(item) {
      return item;
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
