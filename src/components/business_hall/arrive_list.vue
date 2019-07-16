<template>
  <div>
    <Tabs>
      <TabPane label="接收管理" icon="md-clipboard">
        <Table stripe border :columns="columns" :data="data" @on-selection-change="select">
          <template slot-scope="{row,index}" hidden slot="date">
            <input type="text" />
            <span>{{row.id}}</span>
          </template>
          <template slot-scope="{row,index}" slot="code">
            <input type="text" v-model="editItem.code" v-if="editIndex === index" />
            <span v-else>{{row.code}}</span>
          </template>
          <template slot-scope="{row,index}" slot="arriveDate">
            <input type="text" v-model="editItem.arriveDate" v-if="editIndex === index" />
            <span v-else>{{row.arriveDate}}</span>
          </template>
          <template slot-scope="{row,index}" slot="transferId">
            <input type="text" v-model="editItem.transferId" v-if="editIndex === index" />
            <span v-else>{{row.transferId}}</span>
          </template>
          <template slot-scope="{row,index}" slot="placeOfDeparture">
            <input type="text" v-model="editItem.placeOfDeparture" v-if="editIndex === index" />
            <span v-else>{{row.placeOfDeparture}}</span>
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
              <Button @click="handleSave(index)">保存</Button>
              <Button @click="editIndex = -1">取消</Button>
            </div>
            <div v-else>
              <Button @click="handleEdit(row,index)">修改</Button>
            </div>
          </template>
        </Table>

        <Button type="error" id="delete_button" @click="modaldelet = true">删除</Button>
        <Modal v-model="modaldelet" width="360">
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>Delete confirmation</span>
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

        <div id="arrive_list_add">
          <Button type="primary" @click="modal = true">添加</Button>
          <Modal
            v-model="modal"
            title="添加"
            v-bind="formItem"
            @on-ok="submitform('formItem')"
            @on-cancle="cancle"
          >
            <Form ref="formItem" :model="formItem" :label-width="80" :rules="ruleValidate">
              <FormItem label="营业厅编号" prop="code">
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
              <FormItem label="中转单编号" prop="transferId">
                <Input v-model="formItem.transferId" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="出发地" prop="placeOfDeparture">
                <Input v-model="formItem.placeOfDeparture" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="货物状态" prop="goodsState">
                <Input v-model="formItem.goodsState" placeholder="Enter something..."></Input>
              </FormItem>
            </Form>
          </Modal>
        </div>

        <div id="submit_for_check">
          <Button type="success" v-bind="sel" @click="submitforcheck(sel)">提交审核</Button>
        </div>

        <div style="margin: 10px;overflow: hidden">
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
      </TabPane>

      <TabPane label="历史记录" icon="ios-clock-outline">
        <h1>等待程序员小哥开发</h1>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import { error } from "util";
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
        code: "025000",
        arriveDate: "2019-7-16",
        transferId: "111",
        placeOfDeparture: "拉文克劳",
        goodsState: "破损"
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
      data: [],
      editIndex: -1, // 当前聚焦的输入框的行数
      editItem: {
        id: "",
        code: "",
        arriveDate: "",
        transferId: "",
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
          title: "营业厅编号",
          slot: "code"
        },
        {
          title: "到达日期",
          slot: "arriveDate",
          sortable: true
        },
        {
          title: "中转单编号",
          slot: "transferId"
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
      ]
    };
  },
  mounted() {
    this.getArriveList(this.currentPage, this.pageSize);
  },
  methods: {
    getArriveList(currentPage, pageSize) {
      const self = this;
      this.$axios
        .get(" http://192.168.2.229/arrive/getArriveList", {
          params: {
            code: "025000",
            currentPage: currentPage,
            pageCount: pageSize
          }
        })
        .then(response => {
          console.log(response);
          if (response.data.status === 200) {
            self.data = response.data.data[0];
            self.sum = response.data.data[1];
          }
        })
        .catch(function(error) {
          self.$Message.error("请求超时,加载本地数据");
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
    handleSave(index) {
      const self = this;
      this.$axios
        .put("http://192.168.2.229/arrive/modifyArriveById", self.editItem)
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
          alert("请求超时,请检查连接信息");
        });
      this.editIndex = -1;
    },
    select(selection, row) {
      // console.log(selection);
      this.sel = selection;
    },
    remove(sel) {
      const self = this;
      var list = [];
      console.log(self.sel);
      if (sel.length > 0) {
        self.modal_loading = true;
        sel.forEach(element => {
          list.push(element.id);
        });
        console.log(list);
        this.$axios
          .delete("http://192.168.2.229/arrive/removeArriveFake", {
            data: list
          })
          .then(response => {
            if (response.data) {
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
        this.$Message.error("你还没有选择");
        setTimeout(() => {
          this.modal_loading = false;
          this.modaldelet = false;
        }, 100);
      }
    },
    submitform(formItem) {
      const self = this;
      console.log(self.formItem);
      self.$refs[formItem].validate(valid => {
        if (valid) {
          self.$axios
            .post("http://192.168.2.229/arrive/addArrive", self.formItem)
            .then(response => {
              if (response.data.status === 200) {
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
    changePage(page) {
      console.log(page);
      // this.currentPage = val;
      this.getLoadCarList(page, this.pageSize);
    },
    changePageSize(pageSize) {
      // console.log(pageSize);
      this.getLoadCarList(this.currentPage, pageSize);
    }
  }
};
</script>
<style >
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
