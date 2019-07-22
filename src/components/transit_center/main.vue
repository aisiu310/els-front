<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 400px;
  height: 30px;
  text-align: center;
  font-size: 3em;
  color: white;
  border-radius: 3px;
  float: left;
  position: relative;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-info {
  border: 1px solid rebeccapurple;
}
.layout-footer-center {
  text-align: center;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">
            <p>Express System</p>
          </div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>

              <router-link to="/transit/arriveList">接收管理</router-link>
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>
              <router-link to="/transit/transferList">中转管理</router-link>
            </MenuItem>
            <MenuItem name="3">
              <Icon type="ios-analytics"></Icon>
              <router-link to="/transit/loadCarList">装车管理</router-link>
            </MenuItem>
          </div>
          <div class="layout-info"></div>
        </Menu>
      </Header>
      <Content :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '20px 0'}">
          <BreadcrumbItem>物流管理系统</BreadcrumbItem>
          <BreadcrumbItem>中转中心业务员</BreadcrumbItem>
          <BreadcrumbItem>{{item}}</BreadcrumbItem>
        </Breadcrumb>
        <Card>
          <div style="min-height: 700px;">
            <router-view></router-view>
          </div>
        </Card>
      </Content>
      <Footer class="layout-footer-center">{{footerTime}} &copy; 上甘岭</Footer>
    </Layout>
  </div>
</template>
<script>
import arriveList from "./arrive_list";
import loadCarList from "./loadcar_list";
import transferList from "./transfer_list";
export default {
  components: {
    arriveList,
    loadCarList,
    transferList
  },
  data() {
    return {
      item: "接收管理",
      footerTime: "2011-2019",
      history1: "历史记录"
    };
  },
  mounted() {
    this.getAllInfo();
  },
  methods: {
    Input(val) {
      this.item = val;
    },
    getAllInfo() {}
  }
};
</script>
