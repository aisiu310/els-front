<template>
  <div class="addOrg">
    <Form ref="organization" :model="organization" :rules="organizationRule" :label-width="80">
      <FormItem label="机构编号" prop="id">
        <Input v-model="organization.id" placeholder="请输入机构编号" @on-blur="validId()"></Input>
      </FormItem>
      <FormItem label="机构名称" prop="name">
        <Input v-model="organization.name" placeholder="请输入机构名称"></Input>
      </FormItem>
      <FormItem label="城市" prop="belong">
        <Select v-model="organization.belong" placeholder="请选择城市">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="地址" prop="address">
        <Input v-model="organization.address" placeholder="请输入详细地址"></Input>
      </FormItem>
      <FormItem label="租金" prop="rent">
        <Input v-model="organization.rent" prefix="logo-usd" placeholder="请输入租金"></Input>
      </FormItem>
      <FormItem label="租期" prop="lease">
        <Input v-model="organization.lease" placeholder="请输入租期"></Input>
      </FormItem>
      <FormItem label="到期时间" prop="due">
        <DatePicker type="date" placeholder="请选择到期时间" v-model="organization.due"></DatePicker>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('organization')" style="margin-left: 30%">新建</Button>
        <Button @click="handleReset('organization')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { api } from "../api/api";
import { url } from "../api/url";
export default {
  data() {
    return {
      organization: {
        id: '',
        name: "",
        belong: "",
        address: "",
        rent: "",
        lease: ""
      },
      cityList: [
        {
          value: "南京",
          label: "南京"
        }
      ],
      organizationRule: {
        id: [{ required: true, message: "机构编号不能为空", trigger: "blur" }],
        name: [
          { required: true, message: "机构名称不能为空", trigger: "blur" }
        ],
        belong: [
          { required: true, message: "机构所属城市不能为空", trigger: "change" }
        ],
        address: [
          { required: true, message: "机构地址不能为空", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.addOrg();
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    addOrg() {
      api
        .addOrg(url.rent_addOrganizationURL, this.organization)
        .then(res => {
          if (res == 1) {
            this.$Message.success("添加成功！");
            this.handleReset("organization");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // valid id 
    validId(){
      api.validId(url.rent_validId, this.organization.id).then(res => {
        if(res.length != 0){
          this.$Message.error("该机构编号已存在");
          this.organization.id = null;
        }
      })
    }
  }
};
</script>

<style scoped>
.addOrg {
  width: 60%;
  margin-left: 20%;
}
</style>
