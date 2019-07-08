<template>
  <div>
    <div class="header">
      <div class="word">初期建账</div>
      <div class="button">
        <Button type="success" @click="modal = true">新建账本</Button>
        <!-- init account modal -->
        <Modal v-model="modal" title="新建账本" :styles="{top: '20px'}" :footer-hide="true">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="创建日期">
              <Row>
                <Col span="11">
                  <FormItem prop="date">
                    <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
                  </FormItem>
                </Col>
              </Row>
            </FormItem>
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
            <FormItem label="账户数量" prop="Bank_account">
              <Input type="number" v-model="formValidate.Bank_account"></Input>
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
  </div>
</template>

<script>
import expandRow from "./init_expand";
export default {
  data() {
    return {
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
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.update(params.index);
                    }
                  }
                },
                "修改"
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
      data: [
        {
          id: "00001",
          date: "2019/07/05",
          name: "上甘岭2019账本",
          organization: 16,
          personnel: 300,
          car: 150,
          inventory: 6,
          Bank_account: 10
        }
      ],
      formValidate: {
        date: "",
        name: "",
        organization: "",
        personnel: "",
        car: "",
        inventory: "",
        Bank_account: ""
      },
      ruleValidate: {
        date: [
          {
            required: true,
            type: "date",
            message: "输入不能为空",
            trigger: "blur"
          }
        ],
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
        Bank_account: [
          { required: true, message: "输入不能为空", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    show(index) {
      this.$Modal.info({
        title: this.data.name,
        content: `编号:${this.data[index].id}<br>创建日期：${this.data[index].date}<br>账本名称：${this.data[index].name}<br>机构数量：${this.data[index].organization}个<br>人员数量：${this.data[index].personnel}人<br>车辆数量：${this.data[index].car}辆<br>仓库数量：${this.data[index].inventory}座<br>银行账号数量：${this.data[index].Bank_account}个`
      });
    },
    // del payee and get the data which is from back-end
    remove(index) {
      this.$Message.error("初始账本无法被删除！");
    },
    update(index) {
      this.$Message.error("对不起，您当前没有权限修改初始账本信息！");
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  height: auto;
  display: flex;
  margin-top: 0.5%;
}
.word {
  width: 20%;
  height: auto;
  font-size: 16px;
  color: black;
  margin-top: 0.3%;
}
.button {
  width: 80%;
  height: auto;
  text-align: right;
  margin-right: 0.5%;
}
.common {
  margin: 5px 0;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
