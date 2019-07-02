<template>
  <div>
    <header>
      <div class="logo">express system</div>
      <div class="menu">
        <Dropdown
          transfer
          placement="bottom-start"
          style="margin-top:16px; margin-left:20px"
        >
          <a href="javascript:void(0)">首页</a>
        </Dropdown>
        <Dropdown
          transfer
          placement="bottom-start"
          style="margin-top:16px; margin-left:20px"
          @on-click="wait()"
        >
          <a href="javascript:void(0)">
            我的订单
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem>全部订单</DropdownItem>
            <DropdownItem>待取件</DropdownItem>
            <DropdownItem>已签收</DropdownItem>
            <DropdownItem>待派送</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown
          transfer
          placement="bottom-start"
          style="margin-top:16px; margin-left:20px"
          @on-click="wait()"
        >
          <a href="javascript:void(0)">
            账户管理
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem>基本信息</DropdownItem>
            <DropdownItem>地址管理</DropdownItem>
            <DropdownItem>密码修改</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <div class="username">
        <div>
          {{username}}
          <Icon type="md-exit" size="18" @click="exit()" />
        </div>
      </div>
    </header>

    <div class="middle">
      <div class="detail">
        <div class="portrait">
          <img src="../../assets/goudan.png" width="100%" height="100%" />
        </div>
        <p>{{username}}</p>
      </div>

      <!-- 轮播图 走马灯 -->
      <div class="slideshow">
        <Carousel autoplay v-model="slidepic" loop>
          <CarouselItem>
            <div class="demo-carousel">
              <img src="../../assets/我.png" width="100%" height="160px" />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel">
              <img src="../../assets/是.png" width="100%" height="160px" />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel">
              <img src="../../assets/帅.png" width="100%" height="160px" />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel">
              <img src="../../assets/哥.png" width="100%" height="160px" />
            </div>
          </CarouselItem>
        </Carousel>
      </div>
    </div>

    <div class="search">
      <RadioGroup v-model="search_type">
        <Radio label="订单查询"></Radio>
        <Radio label="物流查询"></Radio>
      </RadioGroup>
      <Input
        v-if="search_type === '订单查询'"
        v-model="search_value"
        placeholder="请输入10位订单号，查询订单详细信息!"
        style="width: 300px"
        :maxlength="10"
      />
      <Input
        v-if="search_type === '物流查询'"
        v-model="search_value"
        placeholder="请输入10位订单号，查询物流信息!"
        style="width: 300px"
        :maxlength="10"
      />
      <Button type="primary" shape="circle" icon="ios-search" @click="search(search_value)">搜索</Button>
    </div>
    <div class="content">普通寄件</div>
    <sender></sender>
  </div>
</template>

<script>
import sender from './sender_detail'
export default {
  components:{
    sender
  },
  data() {
    return {
      username: "",
      search_type: "订单查询",
      // search data
      search_value: "",
      // slide show data
      slidepic: 0
    };
  },
  mounted: function() {
    this.username = this.$route.query.user;
  },
  methods: {
    // return to login.vue
    exit() {
      this.$router.push({ path: "login" });
    },
    // search order by search_type
    search(val) {
      var reg = /^[0-9]*$/;
      if (!val || !reg.test(val)) {
        this.$Message.error("请输入合法10位订单号，订单号为纯数字");
      } else {
        this.$Message.success("输入成功，等待查询！");
        // invoke  the back-end API
      }
    },
    wait() {
      this.$Message.success("工程师正在努力开发中...");
    }
  }
};
</script>


<style scoped>
header {
  width: 80%;
  height: 50px;
  margin-left: 10%;
  display: flex;
}
.logo {
  width: 30%;
  height: 40px;
  color: black;
  font-family: "Brush Script Std";
  font-size: 32px;
  text-align: center;
}

.menu {
  width: 50%;
  height: 40px;
  display: flex;
}

.username {
  width: 20%;
  height: 40px;
  position: relative;
  margin-left: 15%;
}

.username div {
  width: 60%;
  height: 20px;
  position: relative;
  margin-top: 15px;
}

.middle {
  width: 80%;
  height: 160px;
  margin-left: 10%;
  display: flex;
}

.detail {
  width: 30%;
  height: 160px;
}

.portrait {
  width: 100px;
  height: 100px;
  margin-left: 30%;
  margin-top: 10px;
  border-radius: 90px;
}
.portrait img {
  border-radius: 90px;
}

.detail p {
  width: 60%;
  height: 20px;
  margin-left: 18%;
  margin-top: 10px;
  text-align: center;
}

.slideshow {
  width: 70%;
  height: 160px;
}

.search {
  width: 50%;
  height: 32px;
  margin-left: 25%;
  margin-top: 8px;
}

.send{
  width: 80%;
  height: 400px;
  margin-left: 10%;
}

.content{
  width: 80%;
  margin-left: 10%;
  color: black;
  font-size: 24px;
  font-family: "楷体";
}
</style>
