<template>
  <div>
    <Tabs>
      <TabPane label="车辆信息" icon="md-car">
        <Table stripe border :columns="columns" :data="data" @on-selection-change="select">
          <template slot-scope="{row,index}" hidden slot="id">
            <span>{{row.id}}</span>
          </template>
          <template slot-scope="{row,index}" slot="number">
            <input type="text" v-model="editItem.number" v-if="editIndex === index" />
            <span v-else>{{row.number}}</span>
          </template>
          <template slot-scope="{row,index}" slot="code">
            <input type="text" v-model="editItem.code" v-if="editIndex === index" />
            <span v-else>{{row.code}}</span>
          </template>
          <template slot-scope="{row,index}" slot="licensePlate">
            <input type="text" v-model="editItem.licensePlate" v-if="editIndex === index" />
            <span v-else>{{row.licensePlate}}</span>
          </template>
          <template slot-scope="{row,index}" slot="startDate">
            <input type="text" v-model="editItem.startDate" v-if="editIndex === index" />
            <span v-else>{{row.startDate}}</span>
          </template>
          <template slot-scope="{row,index}" slot="endDate">
            <input type="text" v-model="editItem.endDate" v-if="editIndex === index" />
            <span v-else>{{row.endDate}}</span>
          </template>
          <template slot-scope="{row,index}" slot="action">
            <div v-if="editIndex === index">
              <Button v-bind="editItem" @click="handleSave(editItem)">save</Button>
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

        <div id="car_list_add">
          <Button type="primary" @click="modal = true">添加</Button>
          <Modal
            v-model="modal"
            title="添加"
            v-bind="formItem"
            @on-ok="submitform('formItem')"
            @on-cancle="cancle"
          >
            <Form :model="formItem" :label-width="80">
              <FormItem label="number">
                <Input v-model="formItem.number" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="code">
                <Input v-model="formItem.code" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="licensePlate">
                <Input v-model="formItem.licensePlate" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem label="startDate">
                <Row>
                  <Col span="11">
                    <DatePicker type="date" placeholder="Select date" v-model="formItem.startDate"></DatePicker>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="endDate">
                <Row>
                  <Col span="11">
                    <DatePicker type="date" placeholder="Select date" v-model="formItem.endDate"></DatePicker>
                  </Col>
                </Row>
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
import { api } from "./api";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      sum: 0,
      modaldelet: false,
      modal_loading: false,
      modal: false,
      sel: [],
      data: [],
      editIndex: -1, // 当前聚焦的输入框的行数
      editItem: {
        id: "",
        number: "",
        code: "",
        licensePlate: "",
        startDate: "",
        endDate: ""
      },
      formItem: {
        number: "",
        code: "",
        licensePlate: "",
        startDate: "",
        endDate: ""
      },
      ruleValidate: {
        startDate: [
          {
            required: true,
            message: "日期不能为空",
            trigger: "change",
            type: "date"
          }
        ]
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
          title: "车牌号",
          slot: "number",
          sortable: true
        },
        {
          title: "营业厅编号",
          slot: "code",
          sortable: true
        },
        {
          title: "车牌号",
          slot: "licensePlate"
        },
        {
          title: "使用日期",
          slot: "startDate"
        },
        {
          title: "退役日期",
          slot: "endDate"
        },
        {
          title: "操作",
          slot: "action"
        }
      ]
    };
  },
  mounted() {
    this.getCarList(this.currentPage, this.pageSize);
  },
  methods: {
    getCarList() {
      api
        .getCarList()
        .then(response => {
          this.data = response.data.data[0];
          this.sum = response.data.data[1];
        })
        .catch(function(error) {
          alert("请求超时,加载本地数据");
        });
    },
    handleEdit(row, index) {
      this.editItem.id = row.id;
      this.editItem.number = row.number;
      this.editItem.code = row.code;
      this.editItem.licensePlate = row.licensePlate;
      this.editItem.startDate = row.startDate;
      this.editItem.endDate = row.endDate;
      this.editIndex = index;
    },
    handleSave(editItem) {
      api
        .carListSave(editItem)
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
          api
            .removeCarList(sel)
            .then(response => {
              if (response.data) {
                this.modal_loading = false;
                this.modaldelet = false;
                this.$Message.success("Successfully delete");
                this.getCarList();
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
          api
            .carListSubmitForm(formItem)
            .then(response => {
              if (response.data) {
                this.$Message.success("添加成功");
                this.getCarList();
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
    changePage(page) {
      console.log(page);
      this.getCarList(page, this.pageSize);
    },
    changePageSize(pageSize) {
      this.getCarList(this.currentPage, pageSize);
    }
  }
};
</script>
<style>
#delete_button {
  margin: 10px;
  float: left;
}

#car_list_add {
  border: 0px solid rebeccapurple;
  margin: 10px;
  width: auto;
  height: auto;
  float: left;
}
</style>
