<template>
  <div>
    <Tabs>
      <TabPane label="接收管理" icon="md-clipboard">
        <Table stripe border :columns="columns" :data="data" @on-selection-change="select">
          <template slot-scope="{row,index}" slot="date">
            <input type="text" v-model="editDate" v-if="editIndex === index" />
            <span v-else>{{row.date}}</span>
          </template>
          <template slot-scope="{row,index}" slot="number">
            <input type="text" v-model="editNumber" v-if="editIndex === index" />
            <span v-else>{{row.number}}</span>
          </template>
          <template slot-scope="{row,index}" slot="address">
            <input type="text" v-model="editAddress" v-if="editIndex === index" />
            <span v-else>{{row.address}}</span>
          </template>
          <template slot-scope="{row,index}" slot="state">
            <input type="text" v-model="editState" v-if="editIndex === index" />
            <span v-else>{{row.state}}</span>
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
            <Form :model="formItem" :label-width="80">
              <FormItem label="DatePicker">
                <Row>
                  <Col span="11">
                    <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="Address">
                <Input v-model="formItem.input" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="State">
                <Select v-model="formItem.select">
                  <Option value="arrive">arrive</Option>
                  <Option value="transfer">transfer</Option>
                </Select>
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
      formItem: {
        date: "",
        input: "",
        select: ""
      },
      ruleValidate: {
        date: [
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
      editDate: "", // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
      editNumber: "", // 第二列输入框
      editAddress: "", // 第三列输入框
      editState: "", // 第四列输入框
      sum: 0,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "ArriveDate",
          slot: "date",
          sortable: true
        },
        {
          title: "Number",
          slot: "number",
          sortable: true
        },
        {
          title: "Address",
          slot: "address"
        },
        {
          title: "State",
          slot: "state",
          filters: [
            {
              label: "arrive",
              value: "arrive"
            },
            {
              label: "transfer",
              value: "transfer"
            }
          ],
          filterMultiple: true,
          filterMethod(value, row) {
            return row.state.indexOf(value) > -1;
          }
        },
        {
          title: "操作",
          slot: "action"
        }
      ]
    };
  },
  mounted() {
    // this.getArriveList();
    this.data = [
      {
        date: "2016-10-03",
        number: 1,
        address: "New York No. 1 Lake Park",
        state: "arrive"
      },
      {
        date: "2016-10-01",
        number: 2,
        address: "London No. 1 Lake Park",
        state: "transfer"
      },
      {
        date: "2016-10-02",
        number: 3,
        address: "Sydney No. 1 Lake Park",
        state: "arrive"
      },
      {
        date: "2016-10-04",
        number: 4,
        address: "Ottawa No. 2 Lake Park",
        state: "arrive"
      },
      {
        date: "2016-10-04",
        number: 5,
        address: "Ottawa No. 2 Lake Park",
        state: "arrive"
      },
      {
        date: "2016-10-04",
        number: 6,
        address: "Ottawa No. 2 Lake Park",
        state: "arrive"
      },
      {
        date: "2016-10-04",
        number: 7,
        address: "Ottawa No. 2 Lake Park",
        state: "arrive"
      },
      {
        date: "2016-10-04",
        number: 8,
        address: "Ottawa No. 2 Lake Park",
        state: "arrive"
      },
      {
        date: "2016-10-04",
        number: 9,
        address: "Ottawa No. 2 Lake Park",
        state: "arrive"
      },
      {
        date: "2016-10-04",
        number: 10,
        address: "Ottawa No. 2 Lake Park",
        state: "arrive"
      },
      {
        date: "2016-10-04",
        number: 11,
        address: "Ottawa No. 2 Lake Park",
        state: "arrive"
      }
    ];
    this.sum = data.length;
    is.getLoadCarList(this.currentPage, this.pageSize);
  },
  methods: {
    getArriveList(currentPage, pageSize) {
      const self = this;
      this.$axios
        .get(" http://192.168.2.229/order/getPaymentInfoList", {
          params: {
            hallCode: "025000",
            date: "2019-07-12"
          }
        })
        .then(response => {
          if (response.data.status === 200) {
            self.data = response.data.data;
            self.sum = response.data.length;
          }
        })
        .catch(function(error) {
          self.$Message.error("请求超时,加载本地数据");
        });
    },
    handleEdit(row, index) {
      this.editDate = row.date;
      this.editNumber = row.number;
      this.editAddress = row.address;
      this.editState = row.state;
      this.editIndex = index;
    },
    handleSave(index) {
      this.$axios
        .post("url", {
          params: {
            a: this.editDate,
            b: this.editNumber,
            c: this.editAddress,
            d: this.editState
          }
        })
        .then(response => {
          if (response.data) {
            this.getArriveList();
          }
        })
        .catch(function(error) {
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
      if (sel.length > 0) {
        this.modal_loading = true;
        sel.forEach(element => {
          list.push(element.id);
        });
        this.$axios
          .delete(" http://192.168.2.229/order/getPaymentInfoList", {
            data: list
          })
          .then(response => {
            if (response.data === 200) {
              this.modal_loading = false;
              this.modaldelet = false;
              this.getArriveList();
              this.$Message.success("删除成功");
            } else {
              this.$Message.error("没有获取到数据");
              this.modal_loading = false;
              this.modaldelet = false;
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
      self.$refs[formItem].validate(valid => {
        if (valid) {
          self.$axios
            .post("url", self.formItem)
            .then(response => {
              if (response.data.status === 200) {
                self.$Message.success("添加成功");
                self.getArriveList();
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
</style>
