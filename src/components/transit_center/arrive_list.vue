<template>
  <div>
    <Tabs>
      <!-- 接收管理Pane -->
      <TabPane label="接收管理" icon="md-clipboard">
        <!-- 接收管理Pane~card背景 -->
        <Row style="background:#eee;padding:20px">
          <!-- 接收管理Pane~来自营业厅/中转中心card -->
          <Col span="11" style="width:40%">
            <Card :bordered="false">
              <p slot="title">来自营业厅/中转中心的货物</p>
              <Table
                :columns="loadCarColumns"
                :data="data"
                @on-selection-change="selectLoadCarList"
              >
                <template></template>
                <template slot-scope="{ row, index }" slot="action">
                  <Button
                    type="primary"
                    size="small"
                    style="margin-right: 5px"
                    @click="createArriveList()"
                  >生成中转中心到达单</Button>
                </template>
              </Table>
            </Card>
          </Col>
          <!-- 接收管理Pane~中转中心到达单card -->
          <Col span="11" offset="2" style="width:50%">
            <Card shadow>
              <p slot="title">中转中心到达单</p>
              <Form ref="formItem" :model="formItem" :label-width="80" :rules="ruleValidate">
                <FormItem label="中转中心编号" prop="code">
                  <Input v-model="formItem.code" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem label="到达日期" prop="arriveDate">
                  <Row>
                    <Col span="11">
                      <DatePicker
                        type="date"
                        placeholder="Select date"
                        :options="option"
                        v-model="formItem.arriveDate"
                      ></DatePicker>
                    </Col>
                  </Row>
                </FormItem>
                <FormItem label="货物状态" prop="goodsState">
                  <Input v-model="formItem.goodsState" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem label="出发地" prop="placeOfDeparture">
                  <Input v-model="formItem.placeOfDeparture" placeholder="Enter something..."></Input>
                </FormItem>
              </Form>
              <!-- 接收管理Pane~中转中心到达单card~审核 -->
              <div id="submit_for_check">
                <Button type="success" v-bind="sel" @click="submitforcheck(sel)">提交审核</Button>
              </div>
            </Card>
          </Col>
        </Row>
      </TabPane>
      <!-- 历史记录Pane -->
      <TabPane label="历史记录" icon="ios-clock-outline">
        <div>
          <img src="../../assets/B_G.png" />
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import { api } from "./api";
import { error, log } from "util";
import { resolve } from "url";
import { all } from "q";
export default {
  data() {
    return {
      option: {
        shortcuts: [
          {
            text: "Today",
            value() {
              return new Date();
            },
            onClick: picker => {
              this.$Message.info("Click today");
            }
          },
          {
            text: "Yesterday",
            value() {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              return date;
            },
            onClick: picker => {
              this.$Message.info("Click yesterday");
            }
          }
        ]
      },
      formItem: {
        code: sessionStorage.getItem("hallCode"),
        arriveDate: "",
        loadCarId: "12121",
        orderList: "11111,22222,33333,44444"
      },
      ruleValidate: {
        arriveDate: [
          {
            required: true,
            message: "日期不能为空",
            trigger: "change",
            type: "date"
          }
        ]
      },
      modal_loading: false,
      modal: false,
      data: [
        {
          loadCarId: "111",
          orderList: "111222"
        }
      ],
      loadCarColumns: [
        {
          title: "装车单编号",
          slot: "loadCarId"
        },
        {
          title: "订单号集合",
          slot: "orderList",
          tooltip: true
        },
        {
          title: "Action",
          slot: "action"
        }
      ]
    };
  },
  mounted() {
    //显示来自营业厅或中转中心的装车单
    this.getLoadCarList();
  },
  methods: {
    //获取来自营业厅或中转中心的装车单，生成中转中心到达单
    getLoadCarList() {
      const self = this;
      let code = sessionStorage.getItem("hallCode");
      api
        .agetLoadCarList(code)
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            self.loadCarColumns = response.data.date;
          } else {
            self.$Message.error(response.data.msg);
          }
        })
        .catch(error => {
          alert("网络错误，请检查连接信息");
        });
    },
    //根据来自营业厅或中转中心的装车单生成中转中心到达单，这里填充form表单
    createArriveList() {
      let self = this;
      //目的地，出库单有数据时去掉注释使用
      // self.formItem.placeOfDeparture = selLod[0].placeOfArrival;
      self.formItem.goodsState = "完整";
    },
    //根据form表单内的内容，自动生成到达单
    submitform(formItem) {
      const self = this;
      self.$refs["formItem"].validate(valid => {
        if (valid) {
          api
            .arriveListSubmitForm(self.formItem)
            .then(response => {
              console.log(response);
              if (response.data.status) {
                self.getArriveList(this.currentPage, this.pageSize);
                self.$Message.success("添加成功");
              } else {
                self.$Message.warning(response.data.msg);
              }
            })
            .catch(error => {
              self.$Message.error("请求超时,请检查连接信息");
            });
        } else {
          self.modal = "true";
          self.$Message.error("操作失败");
        }
      });
    },
    cancle() {
      this.$Message.info("取消操作");
    },
    submitforcheck(sel) {
      const self = this;
      var list = [];
      if (sel.length > 0) {
        sel.forEach(element => {
          if (element.state === 0) {
            list.push(element.id);
          }
        });
        api
          .arriveListSubmitForCheck(list)
          .then(response => {
            console.log(response);
            if (response.data.status === 200) {
              self.getArriveList(this.currentPage, this.pageSize);
              self.$Message.success(response.data.msg);
            } else {
              self.$Message.error("提交失败");
            }
          })
          .catch(error => {
            console.log(error);
            self.$Message.error("请求超时,请检查连接信息111");
          });
      } else {
        self.$Message.error("你还没有选择");
      }
    }
  }
};
</script>
<style >
#submit_for_check {
  margin: 10px;
  width: auto;
  height: auto;
  float: left;
}
</style>
