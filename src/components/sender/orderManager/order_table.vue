<template>
  <div>
    <div>
      <Table border :columns="columns" :data="data">
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
      <Page
        :total="total"
        :current="currentPage"
        show-elevator
        @on-change="change"
        :page-size="pageSize"
      />
    </div>
  </div>
</template>


<script>
import bus from "../../reuse/bus";
import { api } from "../api/api";
import { url } from "../api/url";
export default {
  data() {
    return {
      total: 0,
      currentPage: 1,
      pageSize: 5,
      columns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "订单条形码",
          key: "code",
          width: 100,
          tooltip: true
        },
        {
          title: "下单时间",
          key: "orderTime",
          width: 150,
          tooltip: true,
          sortable: true
        },
        {
          title: "寄件人",
          key: "senderName"
        },
        {
          title: "收件人",
          key: "addresseeName"
        },
        {
          title: "揽件快递员",
          key: "courierName"
        },
        {
          title: "费用",
          key: "totalFee"
        },
        {
          title: "",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      data: [
        {
          id: "1231231231",
          code: "1231231231",
          courierId: "123",
          courierName: "小明",
          senderName: "小红",
          senderRegion: "南京",
          senderDetailAddress: "雨花台软件大道",
          senderPhone: "12345678912",
          addresseeName: "小黑",
          addresseeRegion: "北京",
          addresseeDetailAddress: "五道口",
          addresseePhone: "12312345565",
          goodsSize: "书信",
          goodsCount: "123",
          goodsWeight: "123",
          remarks: "无",
          type: "特快",
          packingFee: "12",
          freight: "23",
          totalFee: "35",
          orderTime: "2019/07/10 12：01",
          contractTime: "2019/07/10 12：01",
          paymentTime: "2019/07/10 12：01",
          trueAddresseeName: "",
          receiptDate: ""
        }
      ]
    };
  },
  mounted() {
    this.initData(
      url.order_getReceivedURL,
      "15298377719",
      this.currentPage,
      this.pageSize
    );
    // api 获取 data数据
    bus.$on("sendChoice", res => {
      switch (res) {
        case "1-1":
          this.initData(
            url.order_getURL,
            "15298377719",
            this.currentPage,
            this.pageSize
          );
          break;
        case "1-2":
          break;
        case "1-3":
          break;
        default:
          break;
      }
    });
  },
  methods: {
    show(index) {
      this.$Modal.info({
        title: "订单信息",
        content: `
                条形码号：${this.data[index].code}<br>
                快递员编号：${this.data[index].courierId}<br>
                快递员姓名：${this.data[index].courierName}<br>
                寄件人姓名：${this.data[index].senderName}<br>
                寄件人所属区域：${this.data[index].senderRegion}<br>
                寄件人地址：${this.data[index].senderDetailAddress}<br>
                寄件人手机号：${this.data[index].senderPhone}<br>
                收件人姓名：${this.data[index].addresseeName}<br>
                收件人所属区域：${this.data[index].addresseeRegion}<br>
                收件人地址：${this.data[index].addresseeDetailAddress}<br>
                收件人手机号：${this.data[index].addresseePhone}<br>
                货物类型：${this.data[index].goodsType}<br>
                货物数量：${this.data[index].goodsCount}<br>
                货物重量：${this.data[index].goodsWeight}<br>
                快递类型：${this.data[index].type}<br>
                包装费用：${this.data[index].packingFee}<br>
                运费：${this.data[index].freight}<br>
                总费用：${this.data[index].totalFee}<br>
                下单时间：${this.data[index].orderTime}<br>
                付款时间：${this.data[index].paymentTime}<br>
                实际收件人：${this.data[index].trueAddresseeName}<br>
                签收时间：${this.data[index].receiptTime}`
      });
    },
    remove(index) {
      this.data.splice(index, 1);
    },
    change(val) {
      this.initData(url.order_getURL, "15298377719", val, this.pageSize);
    },
    // get All order
    initData(url, phone, currentPage, pageSize) {
      api.initDataByPost(url, phone, currentPage, pageSize).then(res => {
        if (res != null) {
          this.data = res.list;
          this.total = res.total;
        }
      });
    }
  }
};
</script>

<style scoped>
@import url("../css/sender.css");
</style>
