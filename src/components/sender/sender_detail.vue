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
                <Table height="250" :columns="columns" :data="address" @on-row-click="turnSender"></Table>
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
                <Option value="北京">北京</Option>
                <Option value="上海">上海</Option>
                <Option value="深圳">深圳</Option>
                <Option value="南京">南京</Option>
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
                <Table height="250" :columns="columns" :data="address" @on-row-click="turnReceipt"></Table>
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
                <Option value="北京">北京</Option>
                <Option value="上海">上海</Option>
                <Option value="深圳">深圳</Option>
                <Option value="南京">南京</Option>
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
          <label>快递方式：</label>
          <RadioGroup v-model="courie">
            <Radio label="经济快递"></Radio>
            <Radio label="普通快递"></Radio>
            <Radio label="特快"></Radio>
          </RadioGroup>
          <br />
          <br />
          <label>包装方式：</label>
          <RadioGroup v-model="package">
            <Radio label="纸箱"></Radio>
            <Radio label="木箱"></Radio>
            <Radio label="快递袋"></Radio>
            <Radio label="其他"></Radio>
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
export default {
  data() {
    return {
      cost: "",
      package: "",
      courie: "",
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
      address: [
        {
          name: "John Brown",
          phone: 18396016699,
          city: "南京",
          address: "鼓楼区广州路188号苏宁大厦"
        },
        {
          name: "benny",
          phone: 12345679812,
          city: "南京",
          address: "雨花台区京妆商务五号楼"
        },
        {
          name: "Jordan",
          phone: 18396016699,
          city: "厦门",
          address: "软件园二期"
        },
        {
          name: "herry",
          phone: 18396016699,
          city: "上海",
          address: "静安区静安寺"
        }
      ]
    };
  },
  methods: {
    // pay
    pay() {
      this.$Message.success("下单成功");
    },
    // access address in order to fill in information quickly
    turnSender(data, index) {
      this.send = data;
    },
    turnReceipt(data, index) {
      this.receipt = data;
    },
    // get total fee by select express type
    getTotalFee() {}
  },
  // wait for calculate
  watch: {
    package: function() {
      this.cost = "123";
    },
    courie: function(val) {
      this.cost = "150";
    }
  }
};
</script>


<style scoped>
@import url("./css/sender.css");
</style>

