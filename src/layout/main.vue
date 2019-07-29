<template>
  <div>
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

            <Poptip trigger="hover" title="Title" content="content">
              <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
            </Poptip>
          </div>
        </Menu>
      </Header>
      <Content :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '20px 0'}" v-bind="menuItem">
          <BreadcrumbItem>
            <Icon type="ios-home-outline"></Icon>物流管理系统
          </BreadcrumbItem>
          <BreadcrumbItem :to="menuItem[0].path">
            <Icon type="logo-buffer"></Icon>
            {{menuItem[0].meta.title}}
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Icon type="ios-cafe"></Icon>
            {{$route.name}}
          </BreadcrumbItem>
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
      menuItem: ""
    };
  },
  mounted() {},
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
  methods: {}
};
</script>
<style scoped>
/* .layout {
  border: 1px solid #d7dde4; 
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
} */
.layout-logo {
  width: 30%;
  height: auto;
  text-align: center;
  font-size: 30px;
  font-family: "隶书";
  color: white;
  border-radius: 3px;
  float: left;
  position: relative;
  left: -3em;
}
.layout-nav {
  width: 70%;
  margin: 0 auto;
  float: right;
  text-align: right;
  border: 3px solid red;
}
/* .layout-info {
  border: 1px solid rebeccapurple;
} */
.layout-footer-center {
  text-align: center;
}
</style>
