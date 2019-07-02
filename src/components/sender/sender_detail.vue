<template>
  <div class="send">
    <div class="send_up">
      <!-- 寄件人 -->
      <div>
        <div>
          <Icon type="ios-send" size="48" />寄件人
        </div>
        <div>
          <Form ref="formValidate" :model="send" :rules="ruleValidate" :label-width="80">
            <FormItem label="姓名" prop="name">
              <Input v-model="send.name" placeholder="Enter your name"></Input>
            </FormItem>
            <FormItem label="联系方式" prop="phone">
              <Input v-model="send.phone" placeholder="Enter your phone" :maxlength="11"></Input>
            </FormItem>
            <FormItem label="城市" prop="city">
              <Select v-model="send.city" placeholder="Select your city">
                <Option value="beijing">北京</Option>
                <Option value="shanghai">上海</Option>
                <Option value="shenzhen">深圳</Option>
                <Option value="nanjing">南京</Option>
              </Select>
            </FormItem>
            <FormItem label="地址" prop="address">
              <Input v-model="send.address" placeholder="Enter detail address"></Input>
            </FormItem>
          </Form>
        </div>
      </div>
      <!-- 收件人 -->
      <div>
        <div>
          <Icon type="ios-send" size="48" />收件人
        </div>
        <div>
          <Form ref="formValidate" :model="receipt" :rules="ruleValidate" :label-width="80">
            <FormItem label="姓名" prop="name">
              <Input v-model="receipt.name" placeholder="Enter your name"></Input>
            </FormItem>
            <FormItem label="联系方式" prop="phone">
              <Input v-model="receipt.phone" placeholder="Enter your phone" :maxlength="11"></Input>
            </FormItem>
            <FormItem label="城市" prop="city">
              <Select v-model="receipt.city" placeholder="Select your city">
                <Option value="beijing">北京</Option>
                <Option value="shanghai">上海</Option>
                <Option value="shenzhen">深圳</Option>
                <Option value="nanjing">南京</Option>
              </Select>
            </FormItem>
            <FormItem label="地址" prop="address">
              <Input v-model="receipt.address" placeholder="Enter detail address"></Input>
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
          <label>包装方式：</label>
          <RadioGroup v-model="package">
            <Radio label="纸箱"></Radio>
            <Radio label="木箱"></Radio>
            <Radio label="快递袋"></Radio>
            <Radio label="其他"></Radio>
          </RadioGroup>
          <br />
          <br />
          <label>快递方式：</label>
          <RadioGroup v-model="courie">
            <Radio label="经济快递"></Radio>
            <Radio label="普通快递"></Radio>
            <Radio label="特快"></Radio>
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
      package: '',
      courie:'',
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
      }
    };
  },
  methods: {
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
    },
    pay(){
        this.$Message.success("下单成功");
    }
  },
  // wait for calculate
  watch:{
     package:function(){
         this.cost = "123";
     },
     courie:function(val){
         this.cost="150";
     }
  }
};
</script>


<style scoped>
.send {
  width: 80%;
  height: 400px;
  margin-left: 10%;
}

.content {
  width: 80%;
  margin-left: 10%;
  color: black;
  font-size: 24px;
  font-family: "楷体";
}

.send_up {
  width: 100%;
  height: 270px;
  display: flex;
}

.send_up > div {
  width: 50%;
  height: 270px;
}

.send_down {
  width: 100%;
  height: 130px;
  display: flex;
}

.send_down > div {
  width: 50%;
  height: 130px;
}

.expand {
  margin-left: 50px;
}
</style>

