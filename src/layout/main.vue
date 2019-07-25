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
  font-size: 30px;
  font-family: "隶书";
  color: white;
  border-radius: 3px;
  float: left;
  position: relative;
  /* left: 10px; */
}
.layout-nav {
  /* border: 10px solid rebeccapurple; */
  width: 820px;
  margin: 0 auto;
  margin-right: 0px;
}
.layout-info {
  /* border: 1px solid rebeccapurple; */
}
.layout-footer-center {
  text-align: center;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark">
          <div class="layout-logo">
            <p>Express System</p>
          </div>
          <div class="layout-nav">
            <MenuItem
              :v-bind="menuItem"
              v-for="(item, index) in menuItem[0].children"
              :name="item.meta.title"
              :to="menuItem[0].path +'/'+ item.path"
              :key="item.meta.title"
            >
              <Icon :type="item.meta.icon"></Icon>
              {{item.meta.title}}
            </MenuItem>
          </div>
          <div class="layout-info"></div>
        </Menu>
      </Header>
      <Content :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '20px 0'}" v-bind="menuItem">
          <BreadcrumbItem>物流管理系统</BreadcrumbItem>
          <BreadcrumbItem :to="menuItem[0].path">{{menuItem[0].meta.title}}</BreadcrumbItem>
          <BreadcrumbItem>{{breadCrumb}}</BreadcrumbItem>
        </Breadcrumb>
        <Card>
          <div style="min-height: auto;">
            <router-view></router-view>
          </div>
        </Card>
      </Content>
      <Footer class="layout-footer-center">{{footerTime}} &copy; 上甘岭</Footer>
    </Layout>
  </div>
</template>
<script>
import store from "../store/index";
export default {
  data() {
    return {
      footerTime: "2019/06-2019/07",
      menuItem: "",
      breadCrumb: ""
    };
  },
  mounted() {
    this.breadCrumb = store.state.login.breadCrumb;
    console.log("这里是面包屑导航条", this.breadCrumb);
  },
  computed: {
    // 首次进入页面时展开当前页面所属的菜单
    onRoutes() {
      return this.$route.path;
    }
  },
  created() {
    this.menuItem = store.state.login.menu;
    console.log("这里是待展示导航菜单", this.menuItem);
  },
  methods: {
    Input(val) {
      this.item = val;
    },
    getAllInfo() {}
  }
};
</script>
