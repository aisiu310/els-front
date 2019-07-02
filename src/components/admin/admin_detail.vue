<template>
  <Table :columns="columns" :data="data">
    <template slot-scope="{ row, index }" slot="id">
      <Input type="text" v-model="editId" v-if="editIndex === index" />
      <span v-else>{{ row.id }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="job">
      <Input type="text" v-model="editJob" v-if="editIndex === index" />
      <span v-else>{{ row.job }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="department">
      <Input type="text" v-model="editDept" v-if="editIndex === index" />
      <span v-else>{{ row.department }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="name">
      <Input type="text" v-model="editName" v-if="editIndex === index" />
      <span v-else>{{ row.name }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="status">
      <Input type="text" v-model="editStatus" v-if="editIndex === index" />
      <span v-else>{{ row.status }}</span>
    </template>
    <template slot-scope="{ row, index }" slot="limit">
      <Input type="text" v-model="editLimit" v-if="editIndex === index" />
      <span v-else>{{ row.limit }}</span>
    </template>
    <template slot-scope="{ row, index }" slot="password">
      <Input type="text" v-model="editPass" v-if="editIndex === index" />
      <span v-else>{{ row.password }}</span>
    </template>
    <template slot-scope="{ row, index }" slot="action">
      <div v-if="editIndex === index">
        <Button @click="handleSave(index)">保存</Button>
        <Button @click="editIndex = -1">取消</Button>
      </div>
      <div v-else>
        <Button @click="handleEdit(row, index)">操作</Button>
      </div>
    </template>
  </Table>
</template>
    </Table>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "编号",
          slot: "id"
        },
        {
          title: "职位",
          slot: "job"
        },
        {
          title: "部门",
          slot: "department"
        },
        {
          title: "姓名",
          slot: "name"
        },
        {
          title: "状态",
          slot: "status"
        },
        {
          title: "权限",
          slot: "limit"
        },
        {
          title: "密码",
          slot: "password"
        },
        {
          title: "操作",
          slot: "action"
        }
      ],
      data: [
        {
          id: "13456",
          job: "会计",
          department: "财务",
          name: "benny",
          status: "在职",
          limit: "7",
          password: "123456"
        },
        {
          id: "13456",
          job: "会计",
          department: "财务",
          name: "benny",
          status: "在职",
          limit: "7",
          password: "123456"
        },
        {
          id: "13456",
          job: "会计",
          department: "财务",
          name: "benny",
          status: "在职",
          limit: "7",
          password: "123456"
        },
        {
          id: "13456",
          job: "会计",
          department: "财务",
          name: "benny",
          status: "在职",
          limit: "7",
          password: "123456"
        }
      ],
      editIndex: -1, // 当前聚焦的输入框的行数
      editId: "",
      editJob: "", // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
      editDept: "", // 第二列输入框
      editName: "", // 第三列输入框
      editStatus: "", // 第四列输入框
      editLimit: "", // 第五列输入框
      editPass: "" // 第六列输入框
    };
  },
  methods: {
    handleEdit(row, index) {
      this.editId = row.id;
      this.editJob = row.job;
      this.editDept = row.department;
      this.editName = row.name;
      this.editStatus = row.status;
      this.editLimit = row.limit;
      this.editPass = row.password;
      this.editIndex = index;
    },
    handleSave(index) {
      this.data[index].id = this.editId;
      this.data[index].job = this.editJob;
      this.data[index].department = this.editDept;
      this.data[index].name = this.editName;
      this.data[index].status = this.editStatus;
      this.data[index].limit = this.editLimit;
      this.data[index].password = this.editPass;
      this.editIndex = -1;
    }
  }
};
</script>
