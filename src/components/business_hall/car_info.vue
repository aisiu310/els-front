<template>
  <div>
    <Tabs>
      <TabPane label="车辆信息" icon="md-car">
        <Table stripe border :columns="columns" :data="data" @on-selection-change="select">
          <template slot-scope="{row,index}" slot="carnumber">
            <input type="text" v-model="editCarNumber" v-if="editIndex === index" />
            <span v-else>{{row.carnumber}}</span>
          </template>
          <template slot-scope="{row,index}" slot="businesshallnumber">
            <input type="text" v-model="editBusinessHallNumber" v-if="editIndex === index" />
            <span v-else>{{row.businesshallnumber}}</span>
          </template>
          <template slot-scope="{row,index}" slot="usetime">
            <input type="text" v-model="editUseTime" v-if="editIndex === index" />
            <span v-else>{{row.usetime}}</span>
          </template>
          <template slot-scope="{row,index}" slot="carstate">
            <input type="text" v-model="editCatState" v-if="editIndex === index" />
            <span v-else>{{row.carstate}}</span>
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
          <Modal v-model="modal" title="添加" v-bind="formItem"  @on-ok="submitform('formItem')" @on-cancle="cancle">
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

        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="sum" @on-change="changePage" show-elevator show-total></Page>
          </div>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formItem: {
        date: "",
        select: "",
        input: ""
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
      editCarNumber: "", // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
      editBusinessHallNumber: "", // 第二列输入框
      editUseTime: "", // 第三列输入框
      editCatState: "", // 第四列输入框
      sum: 0,

      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "车牌号",
          slot: "carnumber",
          sortable: true
        },
        {
          title: "营业厅",
          slot: "businesshallnumber",
          sortable: true
        },
        {
          title: "投入使用时间",
          slot: "usetime"
        },
        {
          title: "车辆状况",
          slot: "carstate",
          filters: [
            {
              label: "Using",
              value: "Using"
            },
            {
              label: "Reparing",
              value: "Reparing"
            }
          ],
          filterMultiple: true,
          filterMethod(value, row) {
            return row.carstate.indexOf(value) > -1;
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
    var pagedata = [
      {
        carnumber: "苏AX8979",
        businesshallnumber: 1,
        usetime: "2016-10-02",
        carstate: "Using"
      },
      {
        carnumber: "苏AX8979",
        businesshallnumber: 2,
        usetime: "2016-10-02",
        carstate: "Reparing"
      },
      {
        carnumber: "苏AX8979",
        businesshallnumber: 3,
        usetime: "2016-10-02",
        carstate: "Using"
      },
      {
        carnumber: "沪AX8979",
        businesshallnumber: 4,
        usetime: "2016-10-02",
        carstate: "Reparing"
      }
    ];
    this.sum = pagedata.length;
    this.data = pagedata.splice(0, 10);
    // this.data = pagedata;
  },
  methods: {
    getcarinfo() {
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
      this.editCarNumber = row.carnumber;
      this.editBusinessHallNumber = row.businesshallnumber;
      this.editUseTime = row.usetime;
      this.editCatState = row.carstate;
      this.editIndex = index;
    },
    handleSave(index) {
      this.$axios
        .post("url", {
          params: {
            a: this.editCarNumber,
            b: this.editBusinessHallNumber,
            c: this.editUseTime,
            d: this.editCatState
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
                this.getcarinfo();
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
    submitform(formItem) {
      this.$refs[formItem].validate(valid => {
        if (valid) {
          this.$axios
            .post("url", {
              data: {
                date: this.formItem.carnumber,
                input: this.formItem.businesshallnumber
              }
            })
            .then(response => {
              if (response.data) {
                this.$Message.success("添加成功");
                this.getcarinfo();
              }
            })
            .catch(function(error) {
              this.$Message.error("请求超时,请检查连接信息");
            });
        } else {
          this.modal = "true";
          this.$Message.error("操作失败");
        }
      });
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