<template>
  <div>
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
      showData: []
    };
  },
  mounted() {
    this.dataTotal = this.addressData.length;
    this.showData = this.addressData.slice(0, 5);
  },
  methods: {
    change(val) {
      this.showData = this.addressData.slice((val - 1) * 5, val * 5);
    }
  }
};
</script>

<style scoped>
.page {
  margin-right: 1%;
  text-align: right;
}
</style>
