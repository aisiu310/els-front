<template>
  <div class="order_detail">
    <div>
      <Icon type="ios-send" size="38" />收件人信息
    </div>
    <div>
      <label>姓名：</label>
      {{receipt_name}}
      <br />
      <label>电话：</label>
      {{receipt_phone}}
      <br />
      <label>地址：</label>
      {{receipt_address}}
    </div>
    <Divider />
    <div>
      <Icon type="ios-send" size="38" />物品信息
    </div>
    <div class="content">
      <label>物品名称：</label>
      {{goods_name}}
      <br />
      <label>物品总重量：</label>
      {{goods_weight}}
      <br />
      <label>物品体积：</label>
      {{goods_bulk}}
      <br />
      <label>物品数量：</label>
      {{goods_num}}
      <br />
      <label>物品尺寸：</label>
      {{goods_size}}
      <br />
      <label>物品种类：</label>
      {{goods_type}}
    </div>
    <Divider />
    <div>
      <Icon type="ios-send" size="38" />费用信息
    </div>
    <div>
      <label>包装费：</label>
      {{package_fee}}
      <br />
      <label>运费：</label>
      {{courie_fee}}
      <br />
      <label>总运费：</label>
      {{total_fee}}
    </div>
    <Divider />
    <div>
      <Icon type="ios-send" size="38" />其他信息
    </div>
    <div>
      <label>实际收件人：</label>
      {{true_receipt}}
      <br />
      <label>收件日期：</label>
      {{receipt_date}}
      <br />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      receipt_name: "",
      receipt_phone: "",
      receipt_address: "",
      goods_name: "",
      goods_weight:"",
      goods_bulk: "",
      goods_num: "",
      goods_size:"",
      goods_type:"",
      receipt_size: "",
      receipt_type: "",
      package_fee: "",
      courie_fee: "",
      total_fee: "",
      true_receipt: "",
      receipt_date: ""
    };
  }
};
</script>

<style scoped>
.order_detail{
    width: 30%;
    position:absolute;
    margin-left:35%;
    background-color:beige;
}

.order_detail div{
    font-size: 14px;
}
</style>

