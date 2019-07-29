<template>
  <div class="body">
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
    <div class="alonePage">
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
          key: "name"
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
@import url("../css/finance.css");
</style>
