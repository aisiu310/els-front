<template>
  <div>
    <Tabs>
      <TabPane label="接收管理" icon="md-clipboard">
        <Table stripe border :columns="columns" :data="data" @on-selection-change="select">
          <template slot-scope="{row,index}" slot="id">
            <span>{{row.id}}</span>
          </template>
          <template slot-scope="{row,index}" slot="code">
            <input type="text" v-model="editItem.code" v-if="editIndex === index" />
            <span v-else>{{row.code}}</span>
          </template>
          <template slot-scope="{row,index}" slot="date">
            <input type="text" v-model="editItem.date" v-if="editIndex === index" />
            <span v-else>{{row.date}}</span>
          </template>
          <template slot-scope="{row,index}" slot="transportationId">
            <input type="text" v-model="editItem.transportationId" v-if="editIndex === index" />
            <span v-else>{{row.transportationId}}</span>
          </template>
          <template slot-scope="{row,index}" slot="placeOfDeparture">
            <input type="text" v-model="editItem.placeOfDeparture" v-if="editIndex === index" />
            <span v-else>{{row.placeOfDeparture}}</span>
          </template>
          <template slot-scope="{row,index}" slot="placOfArrival">
            <input type="text" v-model="editItem.placOfArrival" v-if="editIndex === index" />
            <span v-else>{{row.placOfArrival}}</span>
          </template>
          <template slot-scope="{row,index}" slot="container">
            <input type="text" v-model="editItem.container" v-if="editIndex === index" />
            <span v-else>{{row.container}}</span>
          </template>
          <template slot-scope="{row,index}" slot="monitor">
            <input type="text" v-model="editItem.monitor" v-if="editIndex === index" />
            <span v-else>{{row.monitor}}</span>
          </template>
          <template slot-scope="{row,index}" slot="freight">
            <input type="text" v-model="editItem.freight" v-if="editIndex === index" />
            <span v-else>{{row.freight}}</span>
          </template>
          <template slot-scope="{row,index}" slot="orderList">
            <input type="text" v-model="editItem.orderList" v-if="editIndex === index" />
            <span v-else>{{row.orderList}}</span>
          </template>
          <template slot-scope="{row,index}" slot="state">
            <input type="text" v-model="state" v-if="editIndex === index" />
            <span v-else>{{row.state}}</span>
          </template>
          <template slot-scope="{ row }" slot="id">
            <strong>{{ row.id }}</strong>
          </template>
          <template slot-scope="{row,index}" slot="action">
            <div v-if="editIndex === index">
              <Button @click="handleSave(index)">save</Button>
              <Button @click="editIndex = -1">cancel</Button>
            </div>
            <div v-else>
              <Button @click="handleEdit(row,index)">操作</Button>
              <Button
                type="primary"
                size="small"
                style="margin-right: 5px"
                @click="show(index)"
              >View</Button>
              <Button type="error" size="small" @click="remove(index)">Delete</Button>
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
              <FormItem label="中转中心编号" prop="code">
                <Input v-model="formItem.code" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="装车日期" prop="date">
                <Row>
                  <Col span="11">
                    <DatePicker
                      type="date"
                      placeholder="请选择日期"
                      :options="option"
                      v-model="formItem.date"
                    ></DatePicker>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="中转单编号" prop="transportationId">
                <Input v-model="formItem.transportationId" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="出发地" prop="placeOfDeparture">
                <Input v-model="formItem.placeOfDeparture" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="到达地" prop="placeOfArrival">
                <Input v-model="formItem.placeOfArrival" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="货柜员" prop="container">
                <Input v-model="formItem.container" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="监装员" prop="monitor">
                <Input v-model="formItem.monitor" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="运费" prop="freight">
                <Input v-model="formItem.freight" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="订单号集合" prop="orderList">
                <Input v-model="formItem.orderList" placeholder="Enter something..."></Input>
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
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      data: [],
      formItem: {
        code: "",
        date: "",
        transportationId: "",
        placeOfDeparture: "",
        placeOfArrival: "",
        container: "",
        monitor: "",
        freight: "",
        orderList: ""
      },
      modaldelet: false,
      modal_loading: false,
      modal: false,
      sel: [],
      data: [],
      sum: 0,
      editIndex: -1, // 当前聚焦的输入框的行数
      editItem: {
        id: "",
        code: "",
        date: "",
        transportationId: "",
        placeOfDeparture: "",
        placeOfArrival: "",
        container: "",
        monitor: "",
        freight: "",
        orderList: ""
      },
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
          title: "中转中心编号",
          slot: "code",
          sortable: true
        },
        {
          title: "装车日期",
          slot: "date",
          sortable: true
        },
        {
          title: "运输编号",
          slot: "transportationId"
        },
        {
          title: "出发地",
          slot: "placeOfDeparture"
        },
        {
          title: "到达地",
          slot: "placeOfArrival"
        },
        {
          title: "货柜员",
          slot: "container"
        },
        {
          title: "监装员",
          slot: "monitor"
        },
        {
          title: "运费",
          slot: "freight"
        },
        {
          title: "订单号集合",
          slot: "orderList"
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
    this.getTransferList(this.currentPage, this.pageSize);
  },
  methods: {
    getTransferList(currentPage, pageSize) {
      const self = this;
      api
        .getTransferList(currentPage, pageSize)
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
    handleEdit(row, index) {
      this.editItem.id = row.id;
      this.editItem.code = row.code;
      this.editItem.date = row.data;
      this.editItem.transportationId = row.transportationId;
      this.editItem.placeOfDeparture = row.placeOfDeparture;
      this.editItem.placeOfArrival = row.placeOfArrival;
      this.editItem.container = row.container;
      this.editItem.monitor = row.monitor;
      this.editItem.freight = row.freight;
      this.editItem.orderList = row.orderList;
      this.editIndex = index;
    },
    handleSave(index, editItem) {
      const self = this;
      console.log(editItem);
      api
        .transferListSave(editItem)
        .then(response => {
          console.log(response);
          if (response.data) {
            this.getTransferList(this.currentPage, this.pageSize);
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
          .transferListRemove(sel)
          .then(response => {
            if (response.data.status === 200) {
              self.modal_loading = false;
              self.modaldelet = false;
              self.getTransferList(self.currentPage, self.pageSize);
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
    submitform(formItem) {
      const self = this;
      self.$refs[formItem].validate(valid => {
        if (valid) {
          // self.$axios
          //   .post("http://192.168.2.229/arrive/addArrive", self.formItem)
          api
            .transferListSubmitForm(self.formItem)
            .then(response => {
              if (response.data.status) {
                self.getTransferList(this.currentPage, this.pageSize);
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
          .transferListSubmitForCheck(list)
          .then(response => {
            console.log(response);
            if (response.data.status === 200) {
              self.getTransferList(this.currentPage, this.pageSize);
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
      console.log(page);
      this.getTransferList(page, this.pageSize);
    },
    changePageSize(pageSize) {
      this.getTransferList(this.currentPage, pageSize);
    }
  }
};
</script>