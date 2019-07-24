<template>
  <div>
    <header>
      <div class="logo">express system</div>
      <div class="menu">
        <Menu mode="horizontal" :theme="theme" active-name="0" @on-select="sendChoice">
          <MenuItem name="0" to="/sender/sender_detail">
            <Icon type="ios-home" />首页
          </MenuItem>
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-briefcase" />订单管理
            </template>
            <MenuItem name="1-1" to="/sender/orderManage/order_table">全部订单</MenuItem>
            <MenuItem name="1-2" to="/sender/orderManage/order_table">待取件</MenuItem>
            <MenuItem name="1-3" to="/sender/orderManage/order_table">派送中</MenuItem>
            <MenuItem name="1-4" to="/sender/orderManage/order_table">已签收</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-people" />账户管理
            </template>
            <MenuItem name="2-1" to="/sender/senderManage/person">基本信息</MenuItem>
            <MenuItem name="2-2" to="/sender/senderManage/address">地址管理</MenuItem>
            <MenuItem name="2-3" to="/sender/senderManage/password">密码修改</MenuItem>
          </Submenu>
        </Menu>
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

    <div>
      <router-view></router-view>
    </div>

    <div v-if="show" class="position">
      <baidu-map
        class="bm-view"
        :center="position"
        :zoom="15"
        :scroll-wheel-zoom="true"
        @click="comfirm()"
      >
        <bm-marker :position="position" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" />
        <!-- <bm-panorama></bm-panorama> -->
      </baidu-map>
    </div>
  </div>
</template>

<script>
import bus from "../reuse/bus";
export default {
  data() {
    return {
      theme: "light",
      username: "sender",
      show: false,
      search_type: "订单查询",
      // search data
      search_value: "",
      // slide show data
      slidepic: 0
    };
  },
  mounted: function() {
    // this.username = this.$route.params.user;
    this.username = "sender";
  },
  methods: {
    // return to login.vue
    exit() {
      this.$router.push({ path: "/" });
    },
    // search order by search_type
    search(val) {
      var reg = /^[0-9]*$/;
      var length = val.length;
      if (!val || !reg.test(val) || length != 10) {
        this.$Message.error("请输入合法10位订单号，订单号为纯数字");
      } else {
        this.$Message.success("输入成功，等待查询！");
        // invoke  the back-end API
        this.show = true;
      }
    },
    sendChoice(val) {
      bus.$emit("sendChoice", val);
      // this.$Message.success("工程师正在努力开发中...");
    }
  }
};
</script>


<style scoped>
@import url("./css/sender.css");
</style>
