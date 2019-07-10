<template>
  <div>
    <div class="page">
      <Button type="success" @click="modal = true">新增地址</Button>
      <Modal title="新增地址" v-model="modal" :styles="{top: '20px'}" :footer-hide="true">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="姓名" prop="name">
            <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
          </FormItem>
          <FormItem label="手机号" prop="phone">
            <Input v-model="formValidate.phone" placeholder="Enter your phone"></Input>
          </FormItem>
          <FormItem label="所属城市" prop="region">
            <Select v-model="formValidate.region" placeholder="Select your city">
              <Option value="beijing">New York</Option>
              <Option value="shanghai">London</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
          </FormItem>
          <FormItem label="详细地址" prop="detail_address">
            <Input
              v-model="formValidate.detail_address"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="Enter something..."
            ></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </Form>
      </Modal>
    </div>
    <div>
      <Table border :columns="columns" :data="showData">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
          <Button type="error" size="small" @click="remove(index)">删除</Button>
        </template>
      </Table>
    </div>
    <div class="page">
      <Page :total="dataTotal" show-elevator @on-change="change" :page-size="5" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataTotal: 0,
      modal: false,
      columns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "姓名",
          key: "name",
          width: 100,
          tooltip: true
        },
        {
          title: "手机号",
          key: "phone",
          width: 150,
          tooltip: true
        },
        {
          title: "所属区域",
          key: "region"
        },
        {
          title: "详细地址",
          key: "detail_address"
        },
        {
          title: "Action",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      addressData: [
        {
          name: "benny",
          phone: "18396016699",
          region: "南京",
          detail_address: "雨花台软件大道"
        },
        {
          name: "benny",
          phone: "18396016699",
          region: "南京",
          detail_address: "雨花台软件大道"
        },
        {
          name: "benny",
          phone: "18396016699",
          region: "南京",
          detail_address: "雨花台软件大道"
        },
        {
          name: "benny",
          phone: "18396016699",
          region: "南京",
          detail_address: "雨花台软件大道"
        },
        {
          name: "benny",
          phone: "18396016699",
          region: "南京",
          detail_address: "雨花台软件大道"
        },
        {
          name: "benny",
          phone: "18396016699",
          region: "南京",
          detail_address: "雨花台软件大道"
        },
        {
          name: "benny",
          phone: "18396016699",
          region: "南京",
          detail_address: "雨花台软件大道"
        },
        {
          name: "benny",
          phone: "18396016699",
          region: "南京",
          detail_address: "雨花台软件大道"
        }
      ],
      showData: [],
      formValidate: {
        name: "",
        phone: "",
        region: "",
        detail_address: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            type: "phone",
            message: "Mailbox cannot be empty",
            trigger: "blur"
          }
        ],
        region: [
          {
            required: true,
            message: "Please select the city",
            trigger: "change"
          }
        ],
        detail_address: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.dataTotal = this.addressData.length;
    this.showData = this.addressData.slice(0, 5);
  },
  methods: {
    change(val) {
      this.showData = this.addressData.slice((val - 1) * 5, val * 5);
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>

<style scoped>
.page {
  margin-right: 1%;
  text-align: right;
  margin-bottom: 0.5%;
}
</style>
