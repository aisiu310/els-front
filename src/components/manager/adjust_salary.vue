<template>
  <Row>
    <Col span="8">
      <Card>
        <p slot="title">
          <Icon type="logo-bitcoin" size="16" />&nbsp;薪资调整
        </p>
        <Form ref="formValidate" :model="salaryStragety" :label-width="80">
          <FormItem label="职位" prop="job">
            <Input v-model="salaryStragety.job"></Input>
          </FormItem>
          <FormItem label="底薪" prop="salary">
            <Input prefix="logo-usd" v-model="salaryStragety.salary"></Input>
          </FormItem>
          <FormItem label="提成" prop="rotalty">
            <Input prefix="logo-usd" v-model="salaryStragety.royalty"></Input>
          </FormItem>
          <FormItem label="是否计次" prop="freight">
            <Select v-model="salaryStragety.freight" style="width:100px">
              <Option value="是">是</Option>
              <Option value="否">否</Option>
            </Select>
          </FormItem>
          <FormItem label="单次运费" prop="singleFreight">
            <Input prefix="logo-usd" v-model="salaryStragety.singleFreight"></Input>
          </FormItem>
          <FormItem>
            <Button
              v-if="buttonSwitch = update"
              type="primary"
              @click="update('formValidate')"
              style="margin-left: 20%"
            >更新薪酬</Button>
          </FormItem>
        </Form>
      </Card>
    </Col>
    <Col span="15" offset="1">
      <Card>
        <p slot="title">
          <Icon type="ios-list-box" size="16" />&nbsp;薪酬列表
        </p>
        <a href="#" slot="extra" @click.prevent="add()">
          <Icon type="ios-loop-strong"></Icon>新增职位
        </a>
        <Table border :columns="columns" :data="data"></Table>
      </Card>
    </Col>
  </Row>
</template>

<script>
import { api } from "./api/api";
import { url } from "./api/url";
export default {
  data() {
    return {
      salaryStragety: {
        id: "",
        job: "",
        salary: "",
        royalty: "",
        freight: "",
        singleFreight: ""
      },
      columns: [
        {
          title: "职位",
          key: "job",
          width: 150
        },
        {
          title: "底薪",
          key: "salary",
          sortable: true
        },
        {
          title: "提成(%)",
          key: "royalty"
        },
        {
          title: "是否计次",
          key: "freight"
        },
        {
          title: "单次运费",
          key: "singleFreight"
        },
        {
          title: "操作",
          key: "action",
          width: 130,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data: []
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    update(name) {
      api
        .updateData(url.salary_updateURL, this.salaryStragety)
        .then(res => {
          if (res == 1) {
            this.$Message.success("更新成功！");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    insert() {},
    add() {
      this.$Message.info("请等待开发人员开发~");
    },
    show(index) {
      this.salaryStragety = this.data[index];
    },
    remove(index) {
      api
        .delData(url.salary_delURL, this.data[index].id)
        .then(res => {
          if (res == 1) {
            this.$Message.success("删除成功！");
            this.data.splice(index, 1);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // get data
    initData() {
      api
        .initData(url.salary_getURL)
        .then(res => {
          if (res != null) {
            this.data = res;
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
</style>
