<template>
  <div>
    <div class="page">
      <Button type="success" @click="modal = true">新增地址</Button>
      <Modal title="新增地址" v-model="modal" :styles="{top: '20px'}" :footer-hide="true">
        <Form ref="myAddress" :model="myAddress" :rules="ruleValidate" :label-width="80">
          <FormItem label="姓名" prop="name">
            <Input v-model="myAddress.name" placeholder="Enter your name"></Input>
          </FormItem>
          <FormItem label="手机号" prop="phone">
            <Input v-model="myAddress.phone" placeholder="Enter your phone"></Input>
          </FormItem>
          <FormItem label="所属城市" prop="city">
            <Select v-model="myAddress.city" placeholder="Select your city">
              <Option
                v-for="item in cityList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="详细地址" prop="address">
            <Input
              v-model="myAddress.address"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="Enter something..."
            ></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="add('myAddress')">提交</Button>
            <Button @click="handleReset('myAddress')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </Form>
      </Modal>
    </div>
    <div>
      <Table border :columns="columns" :data="showData">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
          <Button type="error" size="small" @click="delData(index)">删除</Button>
        </template>
      </Table>
    </div>
    <div class="page">
      <Page :total="dataTotal" show-elevator @on-change="change" :page-size="5" />
    </div>
  </div>
</template>

<script>
import { api } from "../api/api";
import { url } from "../api/url";
export default {
  data() {
    return {
      dataTotal: 0,
      modal: false,
      columns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "姓名",
          key: "name",
          width: 100,
          tooltip: true
        },
        {
          title: "手机号",
          key: "phone",
          width: 150,
          tooltip: true
        },
        {
          title: "所属区域",
          key: "city"
        },
        {
          title: "详细地址",
          key: "address"
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      addressData: [],
      showData: [],
      cityList: [],
      myAddress: {
        account: "18396016699",
        name: "",
        phone: "",
        city: "",
        address: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur",
            len: 11
          }
        ],
        address: [
          {
            required: true,
            message: "地址不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.getCityList();
    this.initData();
  },
  methods: {
    change(val) {
      this.showData = this.addressData.slice((val - 1) * 5, val * 5);
    },
    add(name) {
      this.addNewAddress();
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    // add
    addNewAddress() {
      api.addData(url.address_addURL, this.myAddress).then(res => {
        if (res == 1) {
          this.$Message.success("添加成功！");
          this.modal = false;
          this.handleReset();
        }
      });
    },
    // init data
    initData() {
      api.initAddress(url.address_getURL, "18396016699").then(res => {
        if (res.length != 0) {
          this.addAddress = res;
          this.showData = res.slice(0, 5);
        }
      });
    },
    //detele data by id
    delData(index) {
      api.delData(url.aadress_delURL, this.showData[index].id).then(res => {
        if (res == 1) {
          this.$Message.success("删除成功！");
          this.initData();
        }
      });
    },
    // get city List
    getCityList() {
      api
        .initData(url.city_getURL)
        .then(res => {
          let city = [];
          for (var i = 0; i < res.length; i++) {
            city[i] = { value: res[i].cityName, label: res[i].cityName };
          }
          this.cityList = city;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
@import url("../css/sender.css");
</style>
