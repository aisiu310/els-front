<template>
  <div>
    <header>
      <div class="logo">express system</div>
      <div class="menu">
        <div>
          <Tree :data="index"></Tree>
        </div>
        <div>
          <Tree :data="mine"></Tree>
        </div>
        <div>
          <Tree :data="setting"></Tree>
        </div>
      </div>
      <div class="username">
        <div>
          {{username}}
          <Icon type="md-exit" size="18" @click="exit()" />
        </div>
      </div>
    </header>
    <div class="middle">
      <div class="detial"></div>
      <div class="slideshow"></div>
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
      />
      <Input
        v-if="search_type === '物流查询'"
        v-model="search_value"
        placeholder="请输入10位订单号，查询物流信息!"
        style="width: 300px"
      />
      <Button type="primary" shape="circle" icon="ios-search">搜索</Button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      search_type: "",
      search_value: "",
      index: [
        {
          title: "首页",
          expand: false,
          children: [
            {
              title: "1"
            },
            {
              title: "2"
            }
          ]
        }
      ],
      mine: [
        {
          title: "我的订单",
          expand: false,
          children: [
            {
              title: "1"
            },
            {
              title: "2"
            }
          ]
        }
      ],
      setting: [
        {
          title: "账户管理",
          expand: false,
          children: [
            {
              title: "1"
            },
            {
              title: "2"
            }
          ]
        }
      ]
    };
  },
  mounted: function() {
    this.username = "18396016699";
  },
  methods: {
    exit() {
      this.$router.push({ path: "login" });
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
  background-color: aquamarine;
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

.menu div {
  width: 20%;
  height: 20px;
  position: relative;
  margin-top: 8px;
  margin-left: 20px;
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
  background-color: antiquewhite;
}

.search {
  width: 50%;
  height: 32px;
  margin-left: 25%;
  margin-top: 8px;
}
</style>
