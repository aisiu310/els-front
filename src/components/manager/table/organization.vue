<template>
  <div>
    <div class="select">
      <Select v-model="selectCity" prefix="ios-home" style="width:150px" @on-change="organization">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
    <Table border :columns="columns" :data="rent"></Table>
    <div class="alonePage">
      <Page :total="dataTotal" :current="currentPage" show-elevator @on-change="changePage" />
    </div>
    <!-- update rent -->
    <Modal v-model="rentModal" :styles="{top: '20px'}" @on-ok="updateRent()">
      <Form ref="formValidate" :model="udpateRentData" :label-width="80">
        <FormItem label="租金">
          <Input v-model="udpateRentData.rent" prefix="logo-usd" type="number"></Input>
        </FormItem>
        <FormItem label="期限">
          <Input v-model="udpateRentData.lease"></Input>
        </FormItem>
        <FormItem label="到期时间">
           <DatePicker type="date" v-model="udpateRentData.due"></DatePicker>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { api } from "../api/api";
import { url } from "../api/url";
export default {
  data() {
    return {
      dataTotal: 0,
      currentPage: 1,
      selectCity: "",
      rentModal: false,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "编号",
          key: "id"
        },
        {
          title: "机构名称",
          key: "name",
          width: 150
        },
        {
          title: "隶属",
          key: "belong"
        },
        {
          title: "租金",
          key: "rent"
        },
        {
          title: "地址",
          key: "address",
          width: 200,
          tooltip: true
        },
        {
          title: "租期（/年）",
          width: 120,
          key: "lease"
        },

        {
          title: "到期时间",
          key: "due"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
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
                      this.update(params.index);
                    }
                  }
                },
                "更新"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
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
      rent: [],
      totalRent: [],
      cityList: [],
      udpateRentData: {
        id: "",
        rent: "",
        lease: "",
        due: ""
      }
    };
  },
  mounted() {
    this.getCityList();
  },
  methods: {
    update(index) {
      let self = this;
      self.udpateRentData.id = self.rent[index].id;
      self.udpateRentData.rent = self.rent[index].rent;
      self.udpateRentData.lease = self.rent[index].lease;
      self.udpateRentData.due = self.rent[index].due;
      self.rentModal = true;
    },
    changePage(val) {
      this.rent = this.totalRent.slice((val - 1) * 10, val * 10);
    },
    organization(selectCity) {
      this.getOrgList(selectCity);
    },
    // as function name
    getCityList() {
      api.getCityList(url.rent_getCityURL).then(res => {
        if (res != null) {
          var city = [];
          for (let i = 0; i < res.length; i++)
            city[i] = { value: res[i], label: res[i] };
        }
        this.cityList = city;
        this.selectCity = res[0];
        this.getOrgList(res[0]);
      });
    },
    // as function name
    getOrgList(city) {
      api.getOrgByCity(url.rent_getOrganizationURL, city).then(res => {
        if (res != null) {
          this.totalRent = res;
          this.rent = res.slice(0, 10);
          this.dataLength = res.length;
        }
      });
    },
    // del org
    remove(index) {
      api
        .delData(url.rent_delOrgURL, this.rent[index].id)
        .then(res => {
          if (res == 1) {
            this.$Message.success("删除成功！");
            this.rent.splice(index, 1);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // update rent
    updateRent() {
      api.updateRent(url.rent_updateRentURL, this.udpateRentData).then(res => {
        if (res == 1) {
          this.getOrgList(this.selectCity);
          this.rentModal = false;
        } else {
          alert("修改失败！");
          this.rentModal = false;
        }
      });
    }
  }
};
</script>
<style scoped>
.select {
  width: 15%;
  margin-bottom: 0.3%;
}

.alonePage {
  width: 99%;
  height: auto;
  text-align: right;
  margin-top: 0.5%;
  margin-right: 0.5%;
  margin-bottom: 0.5%;
}
</style>
