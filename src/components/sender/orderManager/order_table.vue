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
import bus from "../../reuse/bus";
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
          title: "订单条形码",
          key: "code",
          width: 100,
          tooltip: true
        },
        {
          title: "下单时间",
          key: "order_time",
          width: 150,
          tooltip: true,
          sortable: true
        },
        {
          title: "寄件人",
          key: "sender_name"
        },
        {
          title: "收件人",
          key: "addressee_name"
        },
        {
          title: "揽件快递员",
          key: "courier_name"
        },
        {
          title: "费用",
          key: "total_fee"
        },
        {
          title: "Action",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      showData: [],
      data: [
        {
          id: "1231231231",
          code: "1231231231",
          courier_id: "123",
          courier_name: "小明",
          sender_name: "小红",
          sender_region: "南京",
          sender_detail_address: "雨花台软件大道",
          sender_phone: "12345678912",
          addressee_name: "小黑",
          addressee_region: "北京",
          addressee_detail_address: "五道口",
          addressee_phone: "12312345565",
          goods_size: "书信",
          goods_count: "123",
          goods_weight: "123",
          remarks: "无",
          type: "特快",
          packing_fee: "12",
          freight: "23",
          total_fee: "35",
          order_time: "2019/07/10 12：01",
          contract_time: "2019/07/10 12：01",
          payment_time: "2019/07/10 12：01",
          true_addressee_name: "",
          receipt_date: ""
        },
        {
          id: "1231231231",
          code: "1231231231",
          courier_id: "123",
          courier_name: "小明",
          sender_name: "小红",
          sender_region: "南京",
          sender_detail_address: "雨花台软件大道",
          sender_phone: "12345678912",
          addressee_name: "小黑",
          addressee_region: "北京",
          addressee_detail_address: "五道口",
          addressee_phone: "12312345565",
          goods_size: "书信",
          goods_count: "123",
          goods_weight: "123",
          remarks: "无",
          type: "特快",
          packing_fee: "12",
          freight: "23",
          total_fee: "35",
          order_time: "2019/07/10 12：01",
          contract_time: "2019/07/10 12：01",
          payment_time: "2019/07/10 12：01",
          true_addressee_name: "",
          receipt_date: ""
        },
        {
          id: "1231231231",
          code: "1231231231",
          courier_id: "123",
          courier_name: "小明",
          sender_name: "小红",
          sender_region: "南京",
          sender_detail_address: "雨花台软件大道",
          sender_phone: "12345678912",
          addressee_name: "小黑",
          addressee_region: "北京",
          addressee_detail_address: "五道口",
          addressee_phone: "12312345565",
          goods_size: "书信",
          goods_count: "123",
          goods_weight: "123",
          remarks: "无",
          type: "特快",
          packing_fee: "12",
          freight: "23",
          total_fee: "35",
          order_time: "2019/07/10 12：01",
          contract_time: "2019/07/10 12：01",
          payment_time: "2019/07/10 12：01",
          true_addressee_name: "",
          receipt_date: ""
        },
        {
          id: "1231231231",
          code: "1231231231",
          courier_id: "123",
          courier_name: "小明",
          sender_name: "小红",
          sender_region: "南京",
          sender_detail_address: "雨花台软件大道",
          sender_phone: "12345678912",
          addressee_name: "小黑",
          addressee_region: "北京",
          addressee_detail_address: "五道口",
          addressee_phone: "12312345565",
          goods_size: "书信",
          goods_count: "123",
          goods_weight: "123",
          remarks: "无",
          type: "特快",
          packing_fee: "12",
          freight: "23",
          total_fee: "35",
          order_time: "2019/07/10 12：01",
          contract_time: "2019/07/10 12：01",
          payment_time: "2019/07/10 12：01",
          true_addressee_name: "",
          receipt_date: ""
        },
        {
          id: "1231231231",
          code: "1231231231",
          courier_id: "123",
          courier_name: "小明",
          sender_name: "小红",
          sender_region: "南京",
          sender_detail_address: "雨花台软件大道",
          sender_phone: "12345678912",
          addressee_name: "小黑",
          addressee_region: "北京",
          addressee_detail_address: "五道口",
          addressee_phone: "12312345565",
          goods_size: "书信",
          goods_count: "123",
          goods_weight: "123",
          remarks: "无",
          type: "特快",
          packing_fee: "12",
          freight: "23",
          total_fee: "35",
          order_time: "2019/07/10 12：01",
          contract_time: "2019/07/10 12：01",
          payment_time: "2019/07/10 12：01",
          true_addressee_name: "",
          receipt_date: ""
        },
        {
          id: "1231231231",
          code: "1231231231",
          courier_id: "123",
          courier_name: "小明",
          sender_name: "小红",
          sender_region: "南京",
          sender_detail_address: "雨花台软件大道",
          sender_phone: "12345678912",
          addressee_name: "小黑",
          addressee_region: "北京",
          addressee_detail_address: "五道口",
          addressee_phone: "12312345565",
          goods_size: "书信",
          goods_count: "123",
          goods_weight: "123",
          remarks: "无",
          type: "特快",
          packing_fee: "12",
          freight: "23",
          total_fee: "35",
          order_time: "2019/07/10 12：01",
          contract_time: "2019/07/10 12：01",
          payment_time: "2019/07/10 12：01",
          true_addressee_name: "",
          receipt_date: ""
        },
        {
          id: "1231231231",
          code: "1231231231",
          courier_id: "123",
          courier_name: "小明",
          sender_name: "小红",
          sender_region: "南京",
          sender_detail_address: "雨花台软件大道",
          sender_phone: "12345678912",
          addressee_name: "小黑",
          addressee_region: "北京",
          addressee_detail_address: "五道口",
          addressee_phone: "12312345565",
          goods_size: "书信",
          goods_count: "123",
          goods_weight: "123",
          remarks: "无",
          type: "特快",
          packing_fee: "12",
          freight: "23",
          total_fee: "35",
          order_time: "2019/07/10 12：01",
          contract_time: "2019/07/10 12：01",
          payment_time: "2019/07/10 12：01",
          true_addressee_name: "",
          receipt_date: ""
        },
        {
          id: "1231231231",
          code: "1231231231",
          courier_id: "123",
          courier_name: "小明",
          sender_name: "小红",
          sender_region: "南京",
          sender_detail_address: "雨花台软件大道",
          sender_phone: "12345678912",
          addressee_name: "小黑",
          addressee_region: "北京",
          addressee_detail_address: "五道口",
          addressee_phone: "12312345565",
          goods_size: "书信",
          goods_count: "123",
          goods_weight: "123",
          remarks: "无",
          type: "特快",
          packing_fee: "12",
          freight: "23",
          total_fee: "35",
          order_time: "2019/07/10 12：01",
          contract_time: "2019/07/10 12：01",
          payment_time: "2019/07/10 12：01",
          true_addressee_name: "",
          receipt_date: ""
        },
        {
          id: "1231231231",
          code: "1231231231",
          courier_id: "123",
          courier_name: "小明",
          sender_name: "小红",
          sender_region: "南京",
          sender_detail_address: "雨花台软件大道",
          sender_phone: "12345678912",
          addressee_name: "小黑",
          addressee_region: "北京",
          addressee_detail_address: "五道口",
          addressee_phone: "12312345565",
          goods_size: "书信",
          goods_count: "123",
          goods_weight: "123",
          remarks: "无",
          type: "特快",
          packing_fee: "12",
          freight: "23",
          total_fee: "35",
          order_time: "2019/07/10 12：01",
          contract_time: "2019/07/10 12：01",
          payment_time: "2019/07/10 12：01",
          true_addressee_name: "",
          receipt_date: ""
        },
        {
          id: "1231231231",
          code: "1231231231",
          courier_id: "123",
          courier_name: "小明",
          sender_name: "小红",
          sender_region: "南京",
          sender_detail_address: "雨花台软件大道",
          sender_phone: "12345678912",
          addressee_name: "小黑",
          addressee_region: "北京",
          addressee_detail_address: "五道口",
          addressee_phone: "12312345565",
          goods_size: "书信",
          goods_count: "123",
          goods_weight: "123",
          remarks: "无",
          type: "特快",
          packing_fee: "12",
          freight: "23",
          total_fee: "35",
          order_time: "2019/07/10 12：01",
          contract_time: "2019/07/10 12：01",
          payment_time: "2019/07/10 12：01",
          true_addressee_name: "",
          receipt_date: ""
        },
        {
          id: "1231231231",
          code: "1231231231",
          courier_id: "123",
          courier_name: "小明",
          sender_name: "小红",
          sender_region: "南京",
          sender_detail_address: "雨花台软件大道",
          sender_phone: "12345678912",
          addressee_name: "小黑",
          addressee_region: "北京",
          addressee_detail_address: "五道口",
          addressee_phone: "12312345565",
          goods_size: "书信",
          goods_count: "123",
          goods_weight: "123",
          remarks: "无",
          type: "特快",
          packing_fee: "12",
          freight: "23",
          total_fee: "35",
          order_time: "2019/07/10 12：01",
          contract_time: "2019/07/10 12：01",
          payment_time: "2019/07/10 12：01",
          true_addressee_name: "",
          receipt_date: ""
        }
      ]
    };
  },
  mounted() {
    // api 获取 data数据
    this.dataTotal = this.data.length;
    this.showData = this.data.slice(0, 5);
    bus.$on("sendChoice", res => {
      switch (res) {
        case "1-1":
          break;
        case "1-2":
          break;
        case "1-3":
          break;
        case "1-4":
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
        content: `编号：${this.data[index].id}<br>
                条形码号：${this.data[index].code}<br>
                快递员编号：${this.data[index].courier_id}<br>
                快递员姓名：${this.data[index].courier_name}<br>
                寄件人姓名：${this.data[index].sender_name}<br>
                寄件人所属区域：${this.data[index].sender_region}<br>
                寄件人地址：${this.data[index].sender_detail_address}<br>
                寄件人手机号：${this.data[index].sender_phone}<br>
                收件人姓名：${this.data[index].addressee_name}<br>
                收件人所属区域：${this.data[index].addressee_region}<br>
                收件人地址：${this.data[index].addressee_detail_address}<br>
                收件人手机号：${this.data[index].addressee_phone}<br>
                货物类型：${this.data[index].goods_size}<br>
                货物重量：${this.data[index].goods_weight}<br>
                特殊备注：${this.data[index].remarks}<br>
                快递类型：${this.data[index].type}<br>
                包装费用：${this.data[index].package_fee}<br>
                运费：${this.data[index].freight}<br>
                总费用：${this.data[index].total_fee}<br>
                下单时间：${this.data[index].order_time}<br>
                预约时间：${this.data[index].contract_time}<br>
                付款时间：${this.data[index].payment_time}<br>
                实际收件人：${this.data[index].true_addressee_name}<br>
                签收时间：${this.data[index].receipt_date}`
      });
    },
    remove(index) {
      this.data.splice(index, 1);
    },
    change(val) {
      this.showData = this.data.slice((val - 1) * 5, val * 5);
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
