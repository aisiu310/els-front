<template>
  <div>
    <Tabs>
      <!-- 接收管理Pane -->
      <TabPane label="接收管理" icon="md-clipboard">
        <!-- 接收管理Pane~card背景 -->
        <Row style="background:#eee;padding:20px">
          <!-- 接收管理Pane~来自营业厅/中转中心card -->
          <Col span="11" style="width:24%">
            <Card :bordered="false">
              <p slot="title">来自营业厅/中转中心</p>
              <Table :columns="loadCarColumns" @on-selection-change="selectLoadCarList"></Table>
              <Button
                type="primary"
                id="arrive_button"
                @click.native="createArriveList();modal = true"
              >生成装车单</Button>
            </Card>
          </Col>
          <!-- 接收管理Pane~中转中心到达单card -->
          <Col span="11" offset="2" style="width:66%">
            <Card shadow>
              <p slot="title">中转中心到达单</p>
              <Table stripe border :columns="columns" :data="data" @on-selection-change="select">
                <template slot-scope="{row,index}" hidden slot="date">
                  <span>{{row.id}}</span>
                </template>
                <template slot-scope="{row,index}" slot="code">
                  <span v-model="editItem.code">{{row.code}}</span>
                </template>
                <template slot-scope="{row,index}" slot="arriveDate">
                  <input type="text" v-model="editItem.arriveDate" v-if="editIndex === index" />
                  <span v-else>{{row.arriveDate}}</span>
                </template>
                <template slot-scope="{row,index}" slot="placeOfDeparture">
                  <input type="text" v-model="editItem.placeOfDeparture" v-if="editIndex === index" />
                  <span v-else>{{row.placeOfDeparture}}</span>
                </template>
                <template slot-scope="{row,index}" slot="transferId">
                  <input type="text" v-model="editItem.transferId" v-if="editIndex === index" />
                  <span v-else>{{row.transferId}}</span>
                </template>
                <template slot-scope="{row,index}" slot="goodsState">
                  <input type="text" v-model="editItem.goodsState" v-if="editIndex === index" />
                  <span v-else>{{row.goodsState}}</span>
                </template>
                <template slot-scope="{row,index}" slot="state">
                  <span>{{row.state}}</span>
                </template>
                <template slot-scope="{ row }" slot="date">
                  <strong>{{ row.date }}</strong>
                </template>
                <template slot-scope="{row,index}" slot="action">
                  <div v-if="editIndex === index">
                    <Button v-bind="editItem" @click="handleSave(index,editItem)">保存</Button>
                    <Button @click="editIndex = -1">取消</Button>
                  </div>
                  <div v-else>
                    <Button @click="handleEdit(row,index)">修改</Button>
                  </div>
                </template>
              </Table>
              <!-- 接收管理Pane~中转中心到达单card~删除 -->
              <Button type="error" id="delete_button" @click="modaldelet = true">删除</Button>
              <Modal v-model="modaldelet" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                  <Icon type="ios-information-circle"></Icon>
                  <span>删除确认</span>
                </p>
                <div style="text-align:center">
                  <p>这些数据删除后无法恢复、你确定要删除吗？</p>
                </div>
                <div slot="footer">
                  <Button
                    type="error"
                    :v-bind="sel"
                    @click="remove(sel)"
                    size="large"
                    long
                    :loading="modal_loading"
                  >Delete</Button>
                </div>
              </Modal>
              <!-- 接收管理Pane~中转中心到达单card~新增  -->
              <Modal
                v-model="modal"
                title="添加"
                v-bind="formItem"
                @on-ok="submitform(formItem)"
                @on-cancle="cancle"
              >
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
              </Modal>
              <!-- 接收管理Pane~中转中心到达单card~审核 -->
              <div id="submit_for_check">
                <Button type="success" v-bind="sel" @click="submitforcheck(sel)">提交审核</Button>
              </div>
              <!-- 接收管理Pane~中转中心到达单card~分页 -->
              <div style="margin: 10px;overflow: hidden;float: right">
                <div style="float: right;">
                  <Page
                    :total="sum"
                    @on-change="changePage"
                    @on-page-size-change="changePageSize"
                    show-sizer
                    :courent="currentPage"
                    :page-size="pageSize"
                    show-elevator
                    show-total
                  ></Page>
                </div>
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
      currentPage: 1,
      pageSize: 10,
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
        placeOfDeparture: "北京",
        goodsState: ""
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
      modaldelet: false,
      modal_loading: false,
      modal: false,
      sel: [],
      selLod: [],
      data: [],
      editIndex: -1, // 当前聚焦的输入框的行数
      editItem: {
        id: "",
        code: "",
        arriveDate: "",
        placeOfDeparture: "",
        goodsState: ""
      },
      sum: 0,
      columns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "中转中心编号",
          slot: "code"
        },
        {
          title: "中转单编号",
          slot: "transferId"
        },
        {
          title: "到达日期",
          slot: "arriveDate",
          sortable: true
        },
        {
          title: "出发地",
          slot: "placeOfDeparture"
        },
        {
          title: "货物状态（损坏、完整、丢失）",
          slot: "goodsState"
        },
        {
          title: "审核状态",
          slot: "state"
        },
        {
          title: "操作",
          slot: "action"
        }
      ],
      loadCarColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "押运员",
          slot: "escort",
          tooltip: true
        },
        {
          title: "到达地",
          slot: "placeOfArrival",
          filters: [
            {
              label: "上海",
              value: "上海"
            },
            {
              label: "南京",
              value: "南京"
            }
          ],
          filterMethod(value, row) {
            return row.placeOfArrival.indexOf(value) > -1;
          }
        }
      ]
    };
  },
  mounted() {
    //显示来自营业厅或中转中心的装车单
    this.getLoadCarList();
    //显示已生成的到达单
    this.getArriveList(this.currentPage, this.pageSize);
  },
  methods: {
    //查询装车单
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
    //查询到达单~自测成功
    getArriveList(currentPage, pageSize) {
      const self = this;
      api
        .getArriveList(currentPage, pageSize)
        .then(response => {
          console.log(response);
          if (response.data.status === 200) {
            self.data = response.data.data.list;
            self.sum = response.data.data.total;
          }
        })
        .catch(function(error) {
          self.$Message.error("请求超时,加载本地数据");
        });
    },
    //根据来自营业厅或中转中心的装车单生成中转中心到达单，这里填充form表单
    createArriveList() {
      let self = this;
      //目的地，出库单有数据时去掉注释使用
      // self.formItem.placeOfDeparture = selLod[0].placeOfArrival;
      self.formItem.goodsState = "完整";
    },
    //选中已揽订单，存入selOrd
    selectLoadCarList() {
      this.selLod = selection;
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
    handleEdit(row, index) {
      this.editItem.id = row.id;
      this.editItem.code = row.code;
      this.editItem.arriveDate = row.arriveDate;
      this.editItem.transferId = row.transferId;
      this.editItem.placeOfDeparture = row.placeOfDeparture;
      this.editItem.goodsState = row.goodsState;
      this.editIndex = index;
    },
    //修改到达单~自测成功
    handleSave(index, editItem) {
      const self = this;
      console.log(editItem);
      api
        .arriveListSave(editItem)
        .then(response => {
          console.log(response);
          if (response.data) {
            this.getArriveList(this.currentPage, this.pageSize);
            this.$Message.success("修改成功");
          } else {
            this.$Message.error("没有获取到数据");
          }
        })
        .catch(error => {
          self.$Message.error(response.date.msg);
        });
      this.editIndex = -1;
    },
    select(selection, row) {
      this.sel = selection;
    },
    remove(sel) {
      let self = this;
      if (sel.length > 0) {
        self.modal_loading = true;
        api
          .arriveListRemove(sel)
          .then(response => {
            if (response.data.status === 200) {
              self.modal_loading = false;
              self.modaldelet = false;
              self.getArriveList(self.currentPage, self.pageSize);
              self.$Message.success("删除成功");
            } else {
              self.$Message.warning(response.data.msg);
              self.modal_loading = false;
              self.modaldelet = false;
            }
          })
          .catch(function(error) {
            self.$Message.error("请求超时,请检查连接信息");
            self.modal_loading = false;
            self.modaldelet = false;
          });
      } else {
        self.$Message.error("你还没有选择");
        setTimeout(() => {
          self.modal_loading = false;
          self.modaldelet = false;
        }, 100);
      }
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
    },
    changePage(page) {
      this.getArriveList(page, this.pageSize);
    },
    changePageSize(pageSize) {
      this.getArriveList(this.currentPage, pageSize);
    }
  }
};
</script>
<style >
#arrive_button {
  margin: 10px;
}
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
