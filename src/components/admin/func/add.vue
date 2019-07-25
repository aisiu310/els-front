<template>
  <div class="add_body">
    <Card :bordered="true">
      <p slot="title">
        <Icon type="md-person-add" size="18"></Icon>&nbsp;新增员工
      </p>
      <a href="#" slot="extra" @click.prevent="exit">
        <Icon type="ios-loop-strong"></Icon>退出
      </a>
      <Form ref="formValidate" :model="employee" :rules="Validate" :label-width="80">
        <FormItem label="工号" prop="code">
          <Input v-model="employee.code" placeholder="请输入工号"></Input>
        </FormItem>
        <FormItem label="城市" prop="city">
          <Select v-model="city" placeholder="请选择城市" filterable>
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="部门" prop="department">
          <Select v-model="employee.department" placeholder="请选择部门" filterable >
            <Option
              v-for="item in departmentList"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="职位" prop="job">
          <Select v-model="employee.job" placeholder="请选择职位" filterable>
            <Option v-for="item in jobList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="姓名" prop="name">
          <Input v-model="employee.name" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input v-model="employee.password" placeholder="请设置密码" type="password"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 32%">确认添加</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import { api } from "../api/api";
import { url } from "../api/url";
export default {
  data() {
    return {
      cityList: [],
      departmentList: [],
      jobList: [
        { value: "快递员", label: "快递员" },
        { value: "营业厅业务员", label: "营业厅业务员" },
        { value: "中转中心业务员", label: "中转中心业务员" },
        { value: "中转中心管理员", label: "中转中心管理人员" },
        { value: "财务", label: "财务" },
        { value: "总经理", label: "总经理" }
      ],
      city: "",
      employee: {
        code: "",
        job: "",
        department: "",
        name: "",
        password: ""
      },
      Validate: {
        code: [{ required: true, message: "工号不能为空！", trigger: "blur" }],
        job: [{ required: true, message: "职位不能为空！", trigger: "blur" }],
        name: [{ required: true, message: "姓名不能为空！", trigger: "blur" }],
        password: [
          {
            required: true,
            min: 6,
            message: "密码最少为6位！",
            trigger: "blur"
          },
          {
            required: true,
            max: 20,
            message: "密码最长为20位！",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.getCiytList();
  },
  watch: {
    city: function(val) {
      this.getDeptList(val);
      immediate: true;
    }
  },
  methods: {
    // get city List
    getCiytList() {
      api
        .getCityList(url.employee_getCityURL)
        .then(res => {
          if (res != null) {
            var city = [];
            for (let i = 0; i < res.length; i++)
              city[i] = { value: res[i], label: res[i] };
          }
          this.cityList = city;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // get dept list by city
    getDeptList(city) {
      api
        .getOrgByCity(url.employee_getDeptURL, city)
        .then(res => {
          if (res != null) {
            var dept = [];
            for (let i = 0; i < res.length; i++)
              dept[i] = { value: res[i].id, label: res[i].name };
          }
          this.departmentList = dept;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // get job list  waiting for dev because of db's design is not good
    getJobList() {},
    // add employee
    addEmployee() {
      console.log(this.employee.department);
      api
        .addData(url.employee_addURL, this.employee)
        .then(res => {
          if (res == 1) {
            this.$Message.success("新增成功！");
            // turn to the employee list router
            this.exit();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.addEmployee();
        } else {
          this.$Message.error("新增失败！");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    // go back
    exit() {
      history.go(-1);
    }
  }
};
</script>
<style scoped>
@import url("../css/admin.css");
</style>

