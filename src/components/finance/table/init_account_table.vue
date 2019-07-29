<template>
  <div class="body">
    <div class="header">
      <div class="word">初期建账</div>
      <div class="search"></div>
      <div class="button">
        <Button type="success" @click="modal = true">新建账本</Button>
        <!-- init account modal -->
        <Modal v-model="modal" title="新建账本" :styles="{top: '20px'}" :footer-hide="true">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="账本名称" prop="name">
              <Input v-model="formValidate.name"></Input>
            </FormItem>
            <FormItem label="机构数量" prop="organization">
              <Input type="number" v-model="formValidate.organization"></Input>
            </FormItem>
            <FormItem label="人员数量" prop="personnel">
              <Input type="number" v-model="formValidate.personnel"></Input>
            </FormItem>
            <FormItem label="车辆数量" prop="car">
              <Input type="number" v-model="formValidate.car"></Input>
            </FormItem>
            <FormItem label="仓库数量" prop="inventory">
              <Input type="number" v-model="formValidate.inventory"></Input>
            </FormItem>
            <FormItem label="账户数量" prop="bankAccount">
              <Input type="number" v-model="formValidate.bankAccount"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formValidate')">新建账本</Button>
              <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
          </Form>
        </Modal>
      </div>
    </div>
    <hr class="common" />
    <div>
      <Table :columns="columns" :data="data"></Table>
    </div>
    <div class="alonePage">
      <Page :total="dataLength" :current="currentPage" show-elevator @on-change="changePage" />
    </div>
  </div>
</template>

<script>
import expandRow from "./init_expand";
import { api } from "../api/api";
import { url } from "../api/url";
export default {
  data() {
    return {
      data: [],
      dataLength: 0,
      currentPage: 1,
      modal: false,
      columns: [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            });
          }
        },
        {
          title: "编号",
          key: "id"
        },
        {
          title: "创建日期",
          key: "date"
        },
        {
          title: "账本名称",
          key: "name"
        },
        {
          title: "操作",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      formValidate: {
        name: "",
        organization: "",
        personnel: "",
        car: "",
        inventory: "",
        bankAccount: ""
      },
      ruleValidate: {
        name: [{ required: true, message: "输入不能为空", trigger: "blur" }],
        organization: [
          { required: true, message: "输入不能为空", trigger: "change" }
        ],
        personnel: [
          { required: true, message: "输入不能为空", trigger: "change" }
        ],
        car: [{ required: true, message: "输入不能为空", trigger: "change" }],
        inventory: [
          { required: true, message: "输入不能为空", trigger: "change" }
        ],
        bankAccount: [
          { required: true, message: "输入不能为空", trigger: "change" }
        ]
      }
    };
  },
  mounted() {
    this.initData(this.currentPage);
  },
  methods: {
    show(index) {
      this.$Modal.info({
        title: this.data.name,
        content: `编号:${this.data[index].id}<br>创建日期：${this.data[index].date}<br>账本名称：${this.data[index].name}<br>机构数量：${this.data[index].organization}个<br>人员数量：${this.data[index].personnel}人<br>车辆数量：${this.data[index].car}辆<br>仓库数量：${this.data[index].inventory}座<br>银行账号数量：${this.data[index].bankAccount}个`
      });
    },
    // del payee and get the data which is from back-end
    remove(index) {
      this.$Message.error("初始账本无法被删除！");
    },
    // add init Account
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          api.addData(url.enterprise_addURL, this.formValidate).then(res => {
            if (res == 1) {
              this.initData(this.currentPage);
              this.modal = false;
              this.$Message.success("新建成功");
            } else {
              this.modal = false;
              this.$Message.error("Fail!");
            }
          });
        }
      });
    },
    // reset
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    // page
    changePage(val) {
      this.initData(val);
    },
    initData(skipCount) {
      api.initData(url.enterprise_getURL, skipCount).then(res => {
        this.data = res[0];
        this.dataLength = res[1];
      });
    }
  }
};
</script>

<style scoped>
@import url("../css/finance.css");
</style>
