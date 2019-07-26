const api = "http://192.168.2.229:9001/yuantu/business/";
const total = "http://192.168.2.231:8088/"
const url = {
    // order
    order_addURL: api + "order/addSenderOrder",
    order_getURL: api + "order/getSenderOrderList",
    // calculate
    calculateURL: total + "cityDistance/queryFeeByName?",
    // city
    city_getURL: total + "city/queryAllCity",
    // address
    address_getURL: total + "myaddress/queryMyaddressByAccount?account=",
    aadress_delURL: total + "myaddress/removeMyaddress?id=",
    address_addURL: total + "myaddress/addMyaddress"

}
export { url }