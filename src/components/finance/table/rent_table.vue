<template>
  <div class="body">
    <div class="header">
      <div class="word">租金</div>
      <div class="search"></div>
      <div class="button">
        <Button type="primary" @click="modal = true">
          <Icon type="ios-calculator" size="16" />租金结算
        </Button>

        <Modal title="新建付款单" v-model="modal" :styles="{top: '20px'}" :footer-hide="true">
          <Form :model="formItem" :label-width="80">
            <FormItem label="付款日期">
              <Row>
                <Col span="11">
                  <DatePicker type="date" placeholder="选择付款日期" v-model="formItem.payDate"></DatePicker>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="付款金额">
              <Input
                v-model="formItem.payMoney"
                type="number"
                placeholder="请输入付款金额"
                prefix="logo-usd"
              ></Input>
            </FormItem>
            <FormItem label="付款人">
              <Input v-model="formItem.payName" placeholder="请输入付款人姓名"></Input>
            </FormItem>
            <FormItem label="付款账户">
              <Input v-model="formItem.payAccount" placeholder="请输入付款账户"></Input>
            </FormItem>
            <FormItem label="付款条目">
              <Input
                v-model="formItem.payList"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="请输入付款条目"
              ></Input>
            </FormItem>
            <FormItem label="备注">
              <Input v-model="formItem.payRemarks" placeholder="备注"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="addpay()">新建</Button>
              <Button style="margin-left: 8px" @click="modal = false">取消</Button>
            </FormItem>
          </Form>
        </Modal>
      </div>
    </div>
    <hr class="common" />
    <div class="select">
      <Select v-model="selectCity" prefix="ios-home" style="width:150px" @on-change="organization">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
    <Table border :columns="columns" :data="rent"></Table>
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
      dataLength: 0,
      currentPage: 1,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "编号",
          key: "id"
        },
        {
          title: "机构名称",
          key: "name"
        },
        {
          title: "隶属",
          key: "belong"
        },
        {
          title: "租金",
          key: "rent"
        },
        {
          title: "地址",
          key: "address",
          width: 200,
          tooltip: true
        },
        {
          title: "期限（/年）",
          width: 120,
          key: "lease"
        },

        {
          title: "到期时间",
          key: "due"
        },
        {
          title: "操作",
          key: "action",
          width: 100,
          align: "center",
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
                      this.update(params.index);
                    }
                  }
                },
                "修改"
              )
            ]);
          }
        }
      ],
      rent: [],
      totalRent:[],
      cityList: [],
      selectCity: "",
      formItem: {
        payDate: new Date(),
        payMoney: "",
        payName: "",
        payAccount: "",
        payList: "",
        payRemarks: ""
      }
    };
  },
  mounted() {
    this.getCityList();
  },
  methods: {
    update(index) {
      this.$Modal.info({
        render: h => {
          return h("div", [
            h("Input", {
              props: {
                value: this.rent[index].rent,
                placeholder: "请输入新的租金"
              },
              on: {
                input: val => {
                  this.rent[index].rent = val;
                }
              }
            }),
            h("Input", {
              props: {
                value: this.rent[index].lease,
                placeholder: "请输入新的期限"
              },
              on: {
                input: val => {
                  this.rent[index].lease = val;
                }
              }
            }),
            h("Input", {
              props: {
                value: this.rent[index].due,
                placeholder: "请输入新的到期时间"
              },
              on: {
                input: val => {
                  this.rent[index].due = val;
                }
              }
            })
          ]);
        }
      });
    },
    remove(index) {
      this.rent.splice(index, 1);
    },
    changePage(val) {},
    organization(selectCity) {
      // console.log(this.selectCity);
    },
    // as function name
    getCityList() {
      api.getCityList(url.rent_getCityURL).then(res => {
        if (res != null) {
          var city = [];
          for (let i = 0; i < res.length; i++)
            city[i] = { value: res[i], label: res[i] };
        }
        this.cityList = city;
        this.selectCity = res[0];
        this.getOrgList(res[0]);
      });
    },
    // as function name
    getOrgList(city) {
      api.getOrgByCity(url.rent_getOrganizationURL, city)
        .then(res => {
          if (res != null) {
            // this.rent = res;
            // console.log(res);
            this.totalRent = res;
            this.dataLength = res.length;
          }
        });
    }
  }
};
</script>

<style scoped>
@import url("../css/finance.css");
</style>
