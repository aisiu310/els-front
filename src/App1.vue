<template>
  <div style="background:#eee;padding: 20px">
    <Card :bordered="true">
      <p slot="title">
        <Icon type="ios-people" size="18"></Icon>&nbsp;员工列表
      </p>
      <a href="#" slot="extra" @click.prevent="exit">
        <Icon type="ios-loop-strong"></Icon>退出
      </a>
      <Table stripe :columns="columns" :data="employee">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="reset(index)">重置密码</Button>
          <Button type="error" size="small" @click="remove(index)">删除</Button>
        </template>
      </Table>
      <div class="page">
        <Page
          :total="totalSize"
          :current="currentPage"
          :page-size="pageSize"
          size="small"
          show-total
          show-elevator
          show-sizer
          @on-change="pageChange"
          @on-page-size-change="pageSizeChange"
        />
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalSize: 40,
      currentPage: 1,
      pageSize: 10,
      columns: [
        {
          type: "index",
          width: 60
        },
        {
          title: "工号",
          key: "code"
        },
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "职位",
          key: "job"
        },
        {
          title: "部门编号",
          key: "department"
        },
        {
          title: "密码",
          key: "password"
        },
        {
          title: "权限",
          key: "limit"
        },
        {
          title: "是否在职",
          key: "status"
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      employee: [
        {
          code: 258258,
          name: "benny",
          job: "快递员",
          department: 25001,
          password: "123456",
          limit: 0,
          status: "在职"
        },
        {
          code: 258258,
          name: "benny",
          job: "快递员",
          department: 25001,
          password: "123456",
          limit: 0,
          status: "在职"
        },
        {
          code: 258258,
          name: "benny",
          job: "快递员",
          department: 25001,
          password: "123456",
          limit: 0,
          status: "在职"
        },
        {
          code: 258258,
          name: "benny",
          job: "快递员",
          department: 25001,
          password: "123456",
          limit: 0,
          status: "在职"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    // go back
    exit() {
      history.go(-1);
    },
    // delete employee
    remove(index) {
      this.data.splice(index, 1);
    },
    // reset password
    reset(index) {},
    // page
    pageChange(val) {
      alert(val);
    },
    // page size
    pageSizeChange(val) {
      alert(val);
    },
    // get all employee data by page
    initData() {}
  }
};
</script>

<style scoped>
.page {
  width: 100%;
  height: auto;
  margin-top: 1%;
  text-align: right;
}
</style>
