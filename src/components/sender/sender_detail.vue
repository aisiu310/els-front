<template>
  <div class="send">
    <div class="content">普通寄件</div>
    <div class="send_up">
      <!-- 寄件人 -->
      <div>
        <div class="icon">
          <div class="icon_one">
            <Icon type="ios-send" size="48" />寄件人
          </div>
          <div class="icon_two">
            <Poptip placement="bottom" width="400">
              <span>
                <Icon type="md-bookmarks" size="36" />通信录
              </span>
              <div class="api" slot="content">
                <Table height="auto" :columns="columns" :data="address" @on-row-click="turnSender"></Table>
              </div>
            </Poptip>
          </div>
        </div>
        <div>
          <Form ref="formValidate" :model="send" :rules="ruleValidate" :label-width="80">
            <FormItem label="姓名" prop="name">
              <Input v-model="send.name" placeholder="请输入寄件人姓名"></Input>
            </FormItem>
            <FormItem label="联系方式" prop="phone">
              <Input v-model="send.phone" placeholder="请输入寄件人地址" :maxlength="11"></Input>
            </FormItem>
            <FormItem label="城市" prop="city">
              <Select v-model="send.city" placeholder="请选择发送城市">
                <Option
                  v-for="item in cityList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="地址" prop="address">
              <Input v-model="send.address" placeholder="请输入详细地址"></Input>
            </FormItem>
          </Form>
        </div>
      </div>
      <!-- 收件人 -->
      <div>
        <div class="icon">
          <div class="icon_one">
            <Icon type="ios-send" size="48" />收件人
          </div>
          <div class="icon_two">
            <Poptip placement="bottom" width="400">
              <span>
                <Icon type="md-bookmarks" size="36" />通信录
              </span>
              <div class="api" slot="content">
                <Table height="auto" :columns="columns" :data="address" @on-row-click="turnReceipt"></Table>
              </div>
            </Poptip>
          </div>
        </div>
        <div>
          <Form ref="formValidate" :model="receipt" :rules="ruleValidate" :label-width="80">
            <FormItem label="姓名" prop="name">
              <Input v-model="receipt.name" placeholder="请输入收件人姓名"></Input>
            </FormItem>
            <FormItem label="联系方式" prop="phone">
              <Input v-model="receipt.phone" placeholder="请输入收件人联系方式" :maxlength="11"></Input>
            </FormItem>
            <FormItem label="城市" prop="city">
              <Select v-model="receipt.city" placeholder="请选择到达城市">
                <Option
                  v-for="item in cityList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="地址" prop="address">
              <Input v-model="receipt.address" placeholder="请输入详细地址"></Input>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
    <div class="send_down">
      <!-- 扩展 -->
      <div>
        <div>
          <Icon type="ios-send" size="48" />其他服务
        </div>
        <div class="expand">
          <label>&nbsp;&nbsp;&nbsp;总质量：</label>
          <Select v-model="weight" style="width:200px">
            <Option value="2">0-3kg</Option>
            <Option value="5">3-6kg</Option>
            <Option value="8.5">6-10kg</Option>
          </Select>
          <br />
          <br />
          <label>快递方式：</label>
          <RadioGroup v-model="courie">
            <Radio label="经济快递"></Radio>
            <Radio label="标准快递"></Radio>
            <Radio label="次晨特快"></Radio>
          </RadioGroup>
          <br />
          <br />
          <label>包装方式：</label>
          <RadioGroup v-model="package">
            <Radio label="纸箱"></Radio>
            <Radio label="木箱"></Radio>
            <Radio label="快递袋"></Radio>
          </RadioGroup>
        </div>
      </div>
      <!-- 费用 -->
      <div>
        <div>
          <Icon type="ios-send" size="48" />费用
        </div>
        <div class="expand">
          <label>快递费用：</label>
          <Input
            v-model="cost"
            prefix="logo-usd"
            placeholder="填写完自动计算价格"
            style="width: 200px"
            disabled
          />
          <Button type="success" shape="circle" @click="pay()">下单</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "./api/api";
import { url } from "./api/url";
export default {
  data() {
    return {
      cost: 0,
      package: "",
      packingFee: 0,
      courie: "120",
      courieFee: 0,
      weight: 0,
      cityList: [],
      send: {
        name: "",
        phone: "",
        city: "",
        address: ""
      },
      receipt: {
        name: "",
        phone: "",
        city: "",
        address: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "phone cannot be empty", trigger: "blur" }
        ],
        city: [
          {
            required: true,
            message: "Please select the city",
            trigger: "change"
          }
        ],
        address: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          }
        ]
      },
      columns: [
        {
          title: "姓名",
          key: "name",
          width: 100
        },
        {
          title: "手机号",
          key: "phone",
          tooltip: true,
          width: 100
        },
        {
          title: "城市",
          key: "city"
        },
        {
          title: "地址",
          key: "address",
          tooltip: true
        }
      ],
      address: []
    };
  },
  mounted() {
    this.getCityList();
    this.getAddressList();
  },
  methods: {
    // pay
    pay() {
      let newData = {
        code: this.createRandomId()+"",
        senderName: "this.send.name",
        senderRegion: "this.send.city",
        senderDetailAddress: "this.send.address",
        senderPhone: "18396016699",
        addresseeName: "this.receipt.name",
        addresseeRegion: "this.receipt.city",
        addresseeDetailAddress: "this.receipt.address",
        addresseePhone: "18396016699",
        goodsWeight: 8,
        type: "this.courie",
        packingFee: 18,
        freight: 30,
        totalFee: 48,
        orderTime: new Date()
      };
      api.addOrder(url.order_addURL, newData).then(res => {
        if (res == 1) {
          alert("下单成功，付款界面尚未开发，尽情谅解！");
        }
      });
    },
    // access address in order to fill in information quickly
    turnSender(data, index) {
      this.send = data;
    },
    turnReceipt(data, index) {
      this.receipt = data;
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
    },
    // get address by userId
    getAddressList() {
      api
        .initAddress(url.address_getURL, sessionStorage.getItem("userCode"))
        .then(res => {
          if (res != null) {
            this.address = res;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // get total fee by select express type and weight
    getCourierFee(cityA, cityB, economy_type, weight) {
      api
        .calculateTotalFreight(
          url.calculateURL,
          cityA,
          cityB,
          economy_type,
          weight
        )
        .then(res => {
          this.courieFee = res;
          this.cost = res;
        });
    },
    packageFee(val) {
      alert(val);
    },
    // Randomly generate ten order Numbers
    createRandomId() {
      return (Math.random() * 100000000000).toString().substr(0, 10);
    }
  },
  // wait for calculate
  watch: {
    package: function() {
      if (this.package == "快递袋") {
        this.cost = this.courieFee + 1;
      } else if (this.package == "纸箱") {
        this.cost = this.courieFee + 8;
      } else {
        this.cost = this.courieFee + 18;
      }
    },
    courie: function() {
      let self = this;
      this.getCourierFee(
        self.send.city,
        self.receipt.city,
        self.courie,
        self.weight
      );
    }
  }
};
</script>


<style scoped>
@import url("./css/sender.css");
</style>

