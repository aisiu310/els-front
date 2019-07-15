<template>
  <div>
    <Tabs>
      <TabPane label="司机信息" icon="ios-car">
        <Table stripe border :columns="columns" :data="data" @on-selection-change="select">
          <template slot-scope="{row,index}" slot="driverid">
            <input type="text" v-model="editDriverId" v-if="editIndex === index" />
            <span v-else>{{row.driverid}}</span>
          </template>
          <template slot-scope="{row,index}" slot="businesshallnumber">
            <input type="text" v-model="editBusinessHallNumber" v-if="editIndex === index" />
            <span v-else>{{row.businesshallnumber}}</span>
          </template>
          <template slot-scope="{row,index}" slot="drivername">
            <input type="text" v-model="editDriverName" v-if="editIndex === index" />
            <span v-else>{{row.drivername}}</span>
          </template>
          <template slot-scope="{row,index}" slot="driversex">
            <input type="text" v-model="editDriverSex" v-if="editIndex === index" />
            <span v-else>{{row.driversex}}</span>
          </template>
          <template slot-scope="{row,index}" slot="drivercardid">
            <input type="text" v-model="editDriverCardId" v-if="editIndex === index" />
            <span v-else>{{row.drivercardid}}</span>
          </template>
          <template slot-scope="{row,index}" slot="phonenumber">
            <input type="text" v-model="editPhoneNumber" v-if="editIndex === index" />
            <span v-else>{{row.phonenumber}}</span>
          </template>
          <template slot-scope="{row,index}" slot="driverbirthday">
            <input type="text" v-model="editDriverBirthday" v-if="editIndex === index" />
            <span v-else>{{row.driverbirthday}}</span>
          </template>
          <template slot-scope="{row,index}" slot="driverlicensedata">
            <input type="text" v-model="editDriverLicenseData" v-if="editIndex === index" />
            <span v-else>{{row.driverlicensedata}}</span>
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
          <Modal v-model="modal" title="添加" v-bind="formItem" @on-ok="submitform('formItem')" @on-cancle="cancle">
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
      editDriverId: "", // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
      editBusinessHallNumber: "", // 第二列输入框
      editDriverName: "", // 第三列输入框
      editDriverSex: "", // 第四列输入框
      editDriverCardId: "", // 第二列输入框
      editPhoneNumber: "", // 第三列输入框
      editDriverBirthday: "", // 第四列输入框
      editDriverLicenseData: "", // 第二列输入框
      sum: 0,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "司机编号",
          slot: "driverid",
          sortable: true
        },
        {
          title: "营业厅编号",
          slot: "businesshallnumber",
          sortable: true
        },
        {
          title: "姓名",
          slot: "drivername"
        },
        {
          title: "性别",
          slot: "driversex",
          filters: [
            {
              label: "man",
              value: "man"
            },
            {
              label: "woman",
              value: "woman"
            }
          ],
          filterMultiple: true,
          filterMethod(value, row) {
            return row.driversex.indexOf(value) > -1;
          }
        },
        {
          title: "身份证号码",
          slot: "drivercardid",
          sortable: true
        },
        {
          title: "手机号",
          slot: "phonenumber",
          sortable: true
        },
        {
          title: "出生日期",
          slot: "driverbirthday",
          sortable: true
        },
        {
          title: "行驶证有效期",
          slot: "driverlicensedata",
          sortable: true
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
        driverid: "1",
        businesshallnumber: "123wqer",
        drivername: "褚岩",
        driversex: "man",
        drivercardid: "9879",
        phonenumber: "80970",
        driverbirthday: "2016-10-02",
        driverlicensedata: "2016-10-02"
      },
      {
        driverid: "2",
        businesshallnumber: "123wqer",
        drivername: "褚岩",
        driversex: "man",
        drivercardid: "9879",
        phonenumber: "80970",
        driverbirthday: "2016-10-02",
        driverlicensedata: "2016-10-02"
      },
      {
        driverid: "3",
        businesshallnumber: "123wqer",
        drivername: "程心",
        driversex: "woman",
        drivercardid: "9879",
        phonenumber: "80970",
        driverbirthday: "2016-10-02",
        driverlicensedata: "2016-10-02"
      },
      {
        driverid: "4",
        businesshallnumber: "123wqer",
        drivername: "褚岩",
        driversex: "man",
        drivercardid: "9879",
        phonenumber: "80970",
        driverbirthday: "2016-10-02",
        driverlicensedata: "2016-10-02"
      }
    ];
    this.sum = pagedata.length;
    this.data = pagedata.splice(0, 10);
  },
  methods: {
    getdriverinfo() {
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
      this.editDriverId = row.driverid;
      this.editBusinessHallNumber = row.businesshallnumber;
      this.editDriverName = row.drivername;
      this.editDriverSex = row.driversex;
      this.editDriverCardId = row.drivercardid;
      this.editPhoneNumber = row.phonenumber;
      this.editDriverBirthday = row.driverbirthday;
      this.editDriverLicenseData = row.driverlicensedata;
      this.editIndex = index;
    },
    handleSave(index) {
      this.$axios
        .post("url", {
          params: {
            a: this.editDriverId,
            b: this.editBusinessHallNumber,
            c: this.editDriverName,
            d: this.editDriverSex,
            e: this.editDriverCardId,
            f: this.editPhoneNumber,
            g: this.editDriverBirthday,
            h: this.editDriverLicenseData
          }
        })
        .then(response => {
          if (response.data) {
            this.getdriverinfo();
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
    remove(index) {
      this.data.splice(index, 1);
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
                this.getdriverinfo();
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
                this.getdriverinfo();
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