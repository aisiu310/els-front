<template>
  <div>
    <Tabs>
      <TabPane label="派件管理" icon="ios-swap">
        <Table stripe border :columns="columns" :data="data" @on-selection-change="select">
          <template slot-scope="{row,index}" slot="date">
            <input type="text" v-model="editDate" v-if="editIndex === index" />
            <span v-else>{{row.date}}</span>
          </template>
          <template slot-scope="{row,index}" slot="number">
            <input type="text" v-model="editNumber" v-if="editIndex === index" />
            <span v-else>{{row.number}}</span>
          </template>
          <template slot-scope="{row,index}" slot="deliver">
            <input type="text" v-model="editDeliver" v-if="editIndex === index" />
            <span v-else>{{row.deliver}}</span>
          </template>

          <template slot-scope="{ row }" slot="date">
            <strong>{{ row.date }}</strong>
          </template>

          <template slot-scope="{row,index}" slot="action">
            <div v-if="editIndex === index">
              <Button @click="handleSave(index)">save</Button>
              <Button @click="editIndex = -1">cancel</Button>
            </div>
            <div v-else>
              <Button @click="handleEdit(row,index)">操作</Button>
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
export default {
  data() {
    return {
      formItem: {
        input: "",
        select: "",
        date: "",
        time: ""
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
      editDeliver: "", // 第三列输入框
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
          title: "Deliver",
          slot: "deliver"
        },
        {
          title: "操作",
          slot: "action"
        }
      ]
    };
  },
  mounted() {
    //this.getdeliverlist();
    this.data = [
      {
        date: "2016-10-03",
        number: 1,
        deliver: "New York No. 1 Lake Park"
      },
      {
        date: "2016-10-01",
        number: 2,
        deliver: "London No. 1 Lake Park"
      }
    ];
    this.sum = pagedata.length;
  },
  methods: {
    getdeliverlist(currentPage, pageSize) {
      this.$axios
        .get(" http://192.168.2.229/order/getPaymentInfoList", {
          params: {
            number: "025000",
            date: "2019-07-12"
          }
        })
        .then(response => {
          this.data = response.data.data;
          this.sum = response.data.length;
        })
        .catch(function(error) {
          alert("请求超时,加载本地数据");
        });
    },
    handleEdit(row, index) {
      this.editDate = row.date;
      this.editNumber = row.number;
      this.editDeliver = row.deliver;
      this.editIndex = index;
    },
    handleSave(index) {
      this.$axios
        .post("url", {
          params: {
            a: this.editDate,
            b: this.editNumber,
            c: this.editDeliver
          }
        })
        .then(response => {
          if (response.data) {
            this.getdeliverlist();
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
      if (sel.length) {
        this.modal_loading = true;
        sel.forEach(element => {
          this.$axios
            .delete(" http://192.168.2.229/order/getPaymentInfoList", {
              params: {
                number: element.carnumber
              }
            })
            .then(response => {
              if (response.data) {
                this.modal_loading = false;
                this.modaldelet = false;
                this.$Message.success("Successfully delete");
                this.getdeliverlist();
              } else {
                this.$Message.error("没有获取到数据");
              }
            })
            .catch(function(error) {
              alert("请求超时,请检查连接信息");
              this.modal_loading = false;
              this.modaldelet = false;
            });
        });
      } else {
        this.$Message.error("你还没有选择");
        setTimeout(() => {
          this.modal_loading = false;
          this.modaldelet = false;
        }, 100);
      }
    },
    submitform() {
      if (
        !(this.formItem.input || this.formItem.date || this.formItem.select)
      ) {
        this.$Message.error("输入为空");
      } else {
        console.log(this.formItem.date);
        this.$axios
          .post("url", {
            data: {
              date: this.formItem.date,
              input: this.formItem.input,
              select: this.formItem.select
            }
          })
          .then(response => {
            if (response.data) {
              this.getdeliverlist();
            }
          })
          .catch(function(error) {
            this.$Message.error("请求超时,请检查连接信息");
          });
        this.$Message.success("添加成功");
      }
    },
    cancle() {
      this.$Message.info("取消操作");
    },
    changePage(val) {
      // invoke the back-end API limit 10
      // 后端分页查询
      this.$axios
        .get("url", {
          params: {}
        })
        .then(response => {
          this.data = response.data.data;
        })
        .catch(function(error) {
          alert("请求超时,请检查连接信息");
        });
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
</style>