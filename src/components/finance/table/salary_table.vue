<template>
  <div class="body">
    <div class="header">
      <div class="word">工资表</div>
      <div class="search"></div>
      <div class="button">
        <Button type="primary" @click="calculate()">
          <Icon type="ios-calculator" size="16" />工资结算
        </Button>
        <Button type="error" @click="batchDelete()">
          <Icon type="ios-trash" size="16" />批量删除
        </Button>
      </div>
    </div>
    <hr class="common" />
    <div class="select">
      <Select v-model="selectCity" prefix="ios-home" style="width:100px" @on-change="getOrgList">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Select
        v-model="selectOrg"
        prefix="ios-home"
        style="width:200px; padding-left: 5px"
        @on-change="getSalary"
      >
        <Option v-for="item in orgList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>

    <Table
      border
      :columns="columns"
      :data="salary"
      @on-select="batchSelect"
      @on-select-cancel="batchSelect"
      @on-select-all-cancel="batchSelect"
      @on-select-all="batchSelect"
    ></Table>
    <div class="alonePage">
      <Page :total="total" :current="currentPage" show-total show-elevator @on-change="changePage" />
    </div>

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
          <Input v-model="formItem.payMoney" type="number" placeholder="请输入付款金额" prefix="logo-usd"></Input>
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
          <Button type="primary" @click="addPay()">新建</Button>
          <Button style="margin-left: 8px" @click="modal = false">取消</Button>
        </FormItem>
      </Form>
    </Modal>

    <!-- update rent -->
    <Modal v-model="salaryModal" :styles="{top: '20px'}" @on-ok="updateSalary()">
      <Form ref="formValidate" :model="udpateSalaryData" :label-width="80">
        <FormItem label="扣罚">
          <Input v-model="udpateSalaryData.deduction" prefix="logo-usd" type="number"></Input>
        </FormItem>
        <FormItem label="总计">
          <Input v-model="udpateSalaryData.total" prefix="logo-usd" type="number"></Input>
        </FormItem>
        <FormItem label="备注">
          <Input v-model="udpateSalaryData.remarks"></Input>
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
      salaryModal: false,
      total: 0,
      currentPage: 1,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "工号",
          key: "code"
        },
        {
          title: "职位",
          key: "position",
          width: 130
        },
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "基础工资",
          key: "salary",
          width: 110,
          sortable: true
        },
        {
          title: "提成",
          key: "royalty"
        },
        {
          title: "奖金",
          key: "bonus"
        },
        {
          title: "扣除",
          key: "deduction"
        },
        {
          title: "总计",
          key: "total"
        },
        {
          title: "备注",
          key: "remarks"
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
      salary: [],
      cityList: [],
      orgList: [],
      selectCity: "",
      selectOrg: "",
      deleteArr: [],
      formItem: {
        payDate: new Date(),
        payMoney: "",
        payName: "",
        payAccount: "",
        payList: "机构所有工资总和",
        payRemarks: ""
      },
      udpateSalaryData: {
        id: "",
        deduction: "",
        remarks: "",
        total: ""
      }
    };
  },
  mounted() {
    this.getCity();
  },
  methods: {
    update(index) {
      this.salaryModal = true;
      this.udpateSalaryData.id = this.salary[index].id;
      this.udpateSalaryData.deduction = this.salary[index].deduction;
      this.udpateSalaryData.total = this.salary[index].total;
    },
    batchSelect(selection, row) {},
    // get city and get org
    getCity() {
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
          if (res != null) {
            var org = [];
            for (let i = 0; i < res.length; i++)
              org[i] = { value: res[i].name, label: res[i].name };
          }
          this.orgList = org;
          this.selectOrg = res[0].name;
          this.getSalary(res[0].name);
        }
      });
    },
    // get salary by org
    getSalary(val) {
      api
        .getSalaryByOrg(url.salary_getAllURL, val, this.currentPage)
        .then(res => {
          if (res != null) {
            this.salary = res.list;
            this.total = res.total;
          }
        });
    },
    changePage(val) {
      api
        .getSalaryByOrg(url.salary_getAllURL, this.selectOrg, val)
        .then(res => {
          if (res != null) {
            this.salary = res.list;
            this.total = res.total;
          }
        });
    },
    batchSelect(selection, row) {
      let id = [];
      for (let i = 0; i < selection.length; i++) {
        id[i] = selection[i].id;
      }
      this.deleteArr = id;
    },
    batchDelete() {
      api.batchDeleteSalary(url.salary_delURL, this.deleteArr).then(res => {
        if (res != null) {
          this.$Message.success("删除成功！");
          this.getSalary(this.selectOrg);
        }
      });
    },
    // get total rent
    getTotalRent(org) {
      api.getTotalRent(url.salary_totalURL, org).then(res => {
        if (res != null) {
          this.formItem.payMoney = res;
        }
      });
    },
    // calculate rent
    calculate() {
      this.modal = true;
      this.getTotalRent(this.selectOrg);
    },
    // update rent
    updateSalary() {
      api
        .updateSalary(url.rent_updateRentURL, this.udpateSalaryData)
        .then(res => {
          if (res == 1) {
            // this.getOrgList(this.selectCity);
            this.rentModal = false;
          } else {
            alert("修改失败！");
            this.rentModal = false;
          }
        });
    },
    addPay() {
      api.addData(url.pay_addURL, this.formItem).then(res => {
        if (res != null) {
          this.initPayData(this.currentPage);
          this.modal = false;
          this.$Message.success("创建成功！");
        }
      });
    }
  }
};
</script>

<style scoped>
@import url("../css/finance.css");
</style>
