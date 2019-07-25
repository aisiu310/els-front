const api = "http://192.168.2.229:9001/yuantu/business/";
const total = "http://192.168.2.231:8088/"
const url = {
    // order
    order_addURL: api + "order/addSenderOrder",
    order_getURL: api + "order/getSenderOrderList",
    // calculate
    calculateURL: total + "cityDistance/queryFeeByName?"

}
export { url }