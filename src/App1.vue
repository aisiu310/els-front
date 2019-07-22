<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">Express Logistic</div>
          <div class="layout-nav">
            <MenuItem name="1" to="/warehouse/show">库存展示</MenuItem>
            <Submenu name="2">
              <template slot="title">出/入库管理</template>
              <MenuItem name="2-1" to="/warehouse/out_warehouse">出库</MenuItem>
              <MenuItem name="2-2" to="/warehouse/in_warehouse">入库</MenuItem>
            </Submenu>
            <MenuItem name="3" to="/warehouse/check">
              <Icon type="ios-paper"></Icon>库存盘点
            </MenuItem>
            <MenuItem name="4" to="/warehouse/warn">
              <Icon type="ios-paper"></Icon>库存警戒线
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '20px 0'}">
          <BreadcrumbItem>首页</BreadcrumbItem>
          <BreadcrumbItem>库存展示</BreadcrumbItem>
        </Breadcrumb>
        <div style="background:#eee;padding: 20px;">
          <Card :bordered="true">
            <show></show>
          </Card>
        </div>
      </Content>
      <Footer class="layout-footer-center">2019.06 — 2019.07 &copy; 上甘岭</Footer>
    </Layout>
  </div>
</template>
<script>
import show from "./components/warehouse/func/show";
export default {
  components: {
    show
  },
  mounted(){
    this.success(true);
  },
  methods: {
    success(nodesc) {
      this.$Notice.success({
        title: "欢迎您回来，仓库管理员！"
      });
    }
  }
};
</script>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 200px;
  height: 30px;
  font-family: "楷体";
  font-size: 20px;
  color: white;
  border-radius: 3px;
  float: left;
  position: relative;
}
.layout-nav {
  width: 550px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-footer-center {
  text-align: center;
}
</style>