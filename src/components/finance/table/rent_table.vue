<template>
  <div class="body">
    <div class="header">
      <div class="word">租金</div>
      <div class="search"></div>
      <div class="button">
        <Button type="primary" @click="calculate()">
          <Icon type="ios-calculator" size="16" />租金结算
        </Button>
        <!-- calculate rent modal -->
        <Modal title="租金结算" v-model="modal" :styles="{top: '20px'}" :footer-hide="true">
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
    <!-- update rent -->
    <Modal v-model="rentModal" :styles="{top: '20px'}" @on-ok="updateRent()">
      <Form ref="formValidate" :model="udpateRentData" :label-width="80">
        <FormItem label="租金">
          <Input v-model="udpateRentData.rent" prefix="logo-usd" type="number"></Input>
        </FormItem>
        <FormItem label="期限">
          <Input v-model="udpateRentData.lease"></Input>
        </FormItem>
        <FormItem label="到期时间">
          <Input v-model="udpateRentData.due"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { api } from "../api/api";
import { url } from "../api/url";
export default {
  data() {
    return {
      modal: false,
      rentModal: false,
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
          key: "name",
          width: 150
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
      totalRent: [],
      cityList: [],
      selectCity: "",
      formItem: {
        payDate: new Date(),
        payMoney: "",
        payName: "",
        payAccount: "",
        payList: "",
        payRemarks: ""
      },
      udpateRentData: {
        id: "",
        rent: "",
        lease: "",
        due: ""
      }
    };
  },
  mounted() {
    this.getCityList();
  },
  methods: {
    update(index) {
      let self = this;
      self.udpateRentData.id = self.rent[index].id;
      self.udpateRentData.rent = self.rent[index].rent;
      self.udpateRentData.lease = self.rent[index].lease;
      self.udpateRentData.due = self.rent[index].due;
      self.rentModal = true;
    },
    changePage(val) {
      this.rent = this.totalRent.slice((val - 1) * 10, val * 10);
    },
    organization(selectCity) {
      this.getOrgList(selectCity);
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
      api.getOrgByCity(url.rent_getOrganizationURL, city).then(res => {
        if (res != null) {
          // this.rent = res;
          // console.log(res);
          this.totalRent = res;
          this.rent = res.slice(0, 10);
          this.dataLength = res.length;
        }
      });
    },
    // invoke api
    updateRent() {
      api.updateRent(url.rent_updateRentURL, this.udpateRentData).then(res => {
        if (res == 1) {
          this.getOrgList(this.selectCity);
          this.rentModal = false;
        } else {
          alert("修改失败！");
          this.rentModal = false;
        }
      });
    },
    // get total rent
    getTotalRent(city){
      api.getTotalRent(url.rent_totalRentURL, city).then(res => {
        if(res != null){
          this.formItem.payMoney = res;
        }
      })
    },
    // calculate rent
    calculate(){
      this.modal = true;
      this.getTotalRent(this.selectCity);
    }
  }
};
</script>

<style scoped>
@import url("../css/finance.css");
</style>
