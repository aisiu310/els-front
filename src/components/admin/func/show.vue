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
import { api } from "../api/api";
import { url } from "../api/url";
export default {
  data() {
    return {
      totalSize: 0,
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
      employee: []
    };
  },
  mounted() {
    this.initData(this.currentPage, this.pageSize);
  },
  methods: {
    // go back
    exit() {
      history.go(-1);
    },
    // delete employee
    remove(index) {
      api
        .updateEmployee(url.employee_delURL, this.employee[index].id)
        .then(res => {
          if (res == 1) {
            this.$Message.success("删除成功！");
            this.employee.splice(index, 1);
          }
        })
        .catch(error => {
          console.log(error);
        });
      this.employee.splice(index, 1);
    },
    // reset password
    reset(index) {
      api
        .updateEmployee(url.employee_reserURL, this.employee[index].id)
        .then(res => {
          if (res == 1) {
            this.$Message.success("重置密码成功！");
            this.employee[index].password = "123456";
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // page
    pageChange(val) {
      this.initData(val, this.pageSize);
    },
    // page size
    pageSizeChange(val) {
      this.initData(this.currentPage, val);
    },
    // get all employee data by page
    initData(currentPage, pageSize) {
      var para = {
        currentPage: currentPage,
        pageSize: pageSize
      };
      api
        .getEmployee(url.employee_getURL, para)
        .then(res => {
          if (res != null) {
            this.employee = res.list;
            this.totalSize = res.total;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
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
