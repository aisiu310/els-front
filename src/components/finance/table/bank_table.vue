<template>
  <div>
    <div class="header">
      <div class="word">账户管理</div>
      <div class="search">
        <Input
          search
          v-model="search_value"
          enter-button="搜索"
          placeholder="搜索银行账户信息"
          @on-search="search(search_value)"
        />
      </div>
      <div class="button">
        <Button type="success" @click="modal = true">添加银行账号</Button>
        <!-- init account modal -->
        <Modal v-model="modal" title="添加银行账号" :styles="{top: '20px'}" :footer-hide="true">
          <Form ref="formValidate" :model="bank" :rules="ruleValidate" :label-width="80">
            <FormItem label="账户名称" prop="name">
              <Input v-model="bank.name"></Input>
            </FormItem>
            <FormItem label="账户金额" prop="money">
              <Input type="number" v-model="bank.money"></Input>
            </FormItem>
            <FormItem>
              <Button @click="modal = false" style="margin-left: 8px">取消</Button>
              <Button type="primary" @click="handleSubmit('formValidate')">添加账号</Button>
            </FormItem>
          </Form>
        </Modal>
      </div>
    </div>
    <hr class="common" />
    <div>
      <Table stripe :columns="columns" :data="data"></Table>
    </div>
    <div class="page">
      <Page :total="dataLength" :current="currentPage" show-elevator @on-change="changePage" />
    </div>
  </div>
</template>


<script>
import { api } from "../api/api";
import { url } from "../api/url";
export default {
  data() {
    return {
      modal: false,
      currentPage: 1,
      search_value: "",
      columns: [
        {
          title: "编号",
          key: "id"
        },
        {
          title: "名称",
          key: "name",
          filters: [
            {
              label: "工商银行",
              value: "工商银行"
            },
            {
              label: "建设银行",
              value: "建设银行"
            },
            {
              label: "南京银行",
              value: "南京银行"
            },
            {
              label: "农业银行",
              value: "农业银行"
            },
            {
              label: "交通银行",
              value: "交通银行"
            },
            {
              label: "兴业银行",
              value: "兴业银行"
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            return row.name.indexOf(value) > -1;
          }
        },
        {
          title: "金额",
          key: "money",
          sortable: true
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
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
      data: [],
      dataLength: 0,
      bank: {
        name: "",
        money: ""
      },
      ruleValidate: {
        name: [{ required: true, message: "输入不能为空", trigger: "blur" }],
        money: [
          {
            required: true,
            message: "输入不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.initData(this.currentPage);
  },
  methods: {
    // del bank account
    remove(index) {
      api.delData(url.bank_delURL, this.data[index].id).then(res=>{
        if(res == 1){
          this.$Message.success("删除成功！");
          this.data.splice(index);
        }
      })
    },
    // add bank account
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          api.addData(url.bank_addURL, this.bank).then(res => {
            if (res == 1) {
              this.modal = false;
              this.$Message.success("添加成功！");
              this.initData(this.currentPage);
            }
          });
        }
      });
    },
    // like search
    search(val) {
      api.searchBankData(this.currentPage, val).then(res=>{
        this.data = res[0];
        this.dataLength = res[1];
      })
    },
    // page
    changePage(val) {
      if(this.search_value == null){
        this.initData(val);
      }else{
        this.search(val, this.currentPage);
      }
    },
    // get Init Bank Data
    initData(skipCount) {
      api.initBankData(skipCount).then(res =>{
        this.data = res[0];
        this.dataLength = res[1];
      })
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
  width: 30%;
  height: auto;
  font-size: 16px;
  color: black;
  margin-top: 0.3%;
}
.search {
  width: 40%;
  height: auto;
  text-align: center;
}
.button {
  width: 30%;
  height: auto;
  text-align: right;
  margin-right: 0.5%;
}
.common {
  margin: 5px 0;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
.page {
  width: 97%;
  height: auto;
  text-align: right;
  margin-top: 0.5%;
  margin-right: 3%;
  margin-bottom: 0.5%;
}
</style>
