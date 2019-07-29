<template>
  <div class="login_bg">
    <!-- 登陆页面文本框 -->
    <div class="content">
      <p class="chinese">世界因我们触手可得</p>
      <label class="english">The world is Within Your Reach</label>
    </div>
    <!-- 登录框 -->
    <div class="login_form">
      <span class="loginCeontent">账户登录</span>
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="user">
          <Input type="text" v-model="formInline.user" placeholder="用户名">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input
            type="password"
            v-model="formInline.password"
            placeholder="密码"
            :minlength="6"
            :maxlength="20"
          >
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <!-- 生成验证码 -->
        <div class="authcode">
          <div>
            <Input type="text" v-model="formInline.authcode" placeholder="请输入验证码" :maxlength="4"></Input>
          </div>
          <div class="checkbox" @click="createCode()">{{checkCode}}</div>
        </div>
        <br />
        <FormItem :label-width="60">
          <a @click="miss()" style="margin-left: 8px">
            <label class="miss">忘记密码</label>
          </a>
          &nbsp;&nbsp;&nbsp;
          <Button type="primary" @click="login()">登录</Button>
        </FormItem>
      </Form>
    </div>
    <!-- 物流搜索框 -->
    <div class="logistics">
      <Input
        search
        v-model="logisticId"
        @on-search="logistic_search(logisticId)"
        placeholder="物流查询，请输入快递单号"
        :maxlength="10"
      />
    </div>
    <div v-if="show == true" class="position">
      <baidu-map class="bm-view" :center="position" :zoom="15" :scroll-wheel-zoom="true">
        <bm-marker :position="position" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" />
        <!-- <bm-panorama></bm-panorama> -->
      </baidu-map>
    </div>
  </div>
</template>

<script>
// import { mapMutations } from "vuex";
import axios from "axios";
import { error } from "util";
export default {
  data() {
    return {
      show: false,
      checkCode: "",
      logisticId: "",
      formInline: {
        user: "",
        password: "",
        authcode: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 5,
            max: 20,
            message: "密码不能少于6位,最大为20位",
            trigger: "blur"
          }
        ],
        authcode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      },
      // { lng: 31.932, lat: 118.928 }
      position: {}
    };
  },

  mounted: function() {
    this.createCode();
  },
  computed: {
    // 使用对象展开运算符将 setToken 混入 computed 对象中
    // ...mapMatations(["setToken"])
  },
  methods: {
    // 登录验证
    login() {
      this.$Loading.start();
      let self = this;
      if (
        !self.formInline.user ||
        !self.formInline.password ||
        !self.formInline.authcode
      ) {
        self.$Message.error("用户名、密码、验证码不能为空");
      } else {
        if (self.formInline.authcode == self.checkCode) {
          // self.$axios
          //   .post("http://192.168.2.229:9001/yuantu/login_regist/login", {
          //     account: self.formInline.user,
          //     password: self.formInline.password
          //   })
          //   .then(response => {
          //     console.log(111, response);
          //     if (response.data.status === 200) {
          //       self.$Message.success("登陆成功");
          //       this.$Loading.finish();
          //       self.$store.commit("setToken", response.data.data.userCode);
          //       console.log(1);
          //       self.$store.commit("setRole", response.data.data.identity);
          //       console.log(2);
          //       // self.$store.commit(
          //       //   "setBusinessHallCode",
          //       //   response.data.data.organizationCode
          //       // );
          //       sessionStorage.setItem(
          //         "businessHallCode",
          //         response.data.data.organizationCode
          //       );

          //       // self.$store.commit("setUserName", response.data.data.userName);
          //       console.log(1, self.$store.state.login.role);
          //       self.$router.push({
          //         path: self.$store.state.login.role
          //       });
          //       if (response.data.data.identity === "businessHall") {
          //         self.$store.commit(
          //           "setBusinessHallCode",
          //           response.data.data.identity
          //         );
          //       }
          //     } else {
          //       self.$Message.error(response.data.msg);
          //     }
          //   })
          //   .catch(error => {
          //     console.log(error);
          //     self.$Message.error("服务器异常、检查连接信息");
          //   });
          self.$store.commit("setToken", 123456);
          self.$Message.success("登陆成功");
          sessionStorage.setItem("hallCode", 18001);
          sessionStorage.setItem("courierId", 18001123);
          sessionStorage.setItem("courierName", "courier");
          self.$store.commit("setRole", "courier");
          this.$router.push({
            path: self.$store.state.login.role
          });
        } else {
          this.$Message.error("验证码错误！");
          this.$Loading.error();
        }
      }
    },
    // 忘记密码
    miss() {
      this.$Message.error("请联系管理员，重置密码");
    },
    // 创建验证码
    createCode() {
      var code = "";
      var codeLength = 4; //验证码的长度
      var random = new Array(
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
      ); //随机数
      for (var i = 0; i < codeLength; i++) {
        //循环操作
        var index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）
        code += random[index]; //根据索引取得随机数加到code上
      }
      this.checkCode = code; //把code值赋给验证码
    },
    // 物流查询
    logistic_search(data) {
      var reg = /^[0-9]*$/;
      if (!data || !reg.test(data)) {
        this.$Message.error("请输入合法10位订单号，订单号为纯数字");
        this.show = false;
      } else {
        // invoke the back-end API
        this.$axios
          .post(
            "http://192.168.2.229:9001/yuantu/business/logistics/getLogisticsList",
            { orderCode: data }
          )
          .then(res => {
            if (res.data.status == 200) {
              let result = res.data.data;
              for (let i = 0; i < result.length; i++) {
                if (result[i].state == "派送中") {
                  this.position = result[i].address;
                }
              }
              this.show = true;
            } else {
              this.$Message.error(
                "未查询到该订单号物流信息！请确认订单号是否正确！"
              );
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>

<style scoped>
.loginCeontent {
  font-size: 16px;
  color: white;
  width: 15%;
  position: relative;
  margin-left: 40%;
}

.login_form {
  width: 20%;
  height: 200px;
  position: absolute;
  margin-left: 65%;
  margin-top: 15%;
}

.login_bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-image: url(../../assets/login_bg.png);
  /* background-size: 100% auto; */
  background-size: cover;
}
.miss {
  color: aliceblue;
}

.content {
  width: 25%;
  height: 60px;
  position: absolute;
  margin-left: 10%;
  margin-top: 5%;
  color: white;
}

.chinese {
  font-size: 32px;
}

.english {
  margin-left: 120px;
}

.logistics {
  color: white;
  width: 25%;
  position: absolute;
  margin-left: 10%;
  margin-top: 35%;
}

.authcode {
  display: flex;
}

.checkbox {
  width: 40%;
  font-size: 26px;
  color: white;
  text-align: center;
}
.bm-view {
  width: 300px;
  height: 300px;
}

.position {
  position: relative;
  margin-left: 10%;
  padding-top: 11%;
}
</style>
