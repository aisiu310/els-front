import axios from "axios"
const ip = '192.168.2.229'
const driverIp = '192.168.2.231'
const testIp = '127.0.0.1'
const recipentIp = '192.168.2.151'
//port
const port = ':9001'
const driverPort = ':8088'
const testPort = ':9001'
//path
const loadCarPath = '/yuantu/logistics/loadcar'
const arrivePath = '/yuantu/logistics/arrive'
const deliverPath = '/yuantu/logistics/distribute'
const driverPath = '/driver'
const carPath = '/yuantu/logistics/car'
const recipentPath = '/yuantu/finance/receipt'
const orderPath = '/yuantu/business/order'
//intactPath
const loadCar = testIp + port + loadCarPath
const arrive = testIp + port + arrivePath
const deliver = testIp + port + deliverPath
const car = ip + port + carPath
const driver = driverIp + driverPort + driverPath
const order = ip + port + orderPath
//装车管理url
const getOrderListUrl = "http://" + loadCar + "/getOrderList"
const getLoadCarListUrl = "http://" + loadCar + "/getLoadingList"
const loadcarListSaveUrl = "http://" + loadCar + "/modifyLoadingById"
const loadCarListSubmitFormUrl = "http://" + loadCar + "/addLoading"
const loadCarListRemoveUrl = "http://" + loadCar + "/removeLoadingFake"
const loadCarListSubmitForCheckmUrl = "http://" + loadCar + "/modifyStateList?state=1"
//接收管理url
const getArriveListUrl = "http://" + arrive + "/getArriveList"
const arriveListSaveUrl = "http://" + arrive + "/modifyArriveById"
const arriveListRemoveUrl = "http://" + arrive + "/removeArriveFake"
const arriveListSubmitFormUrl = "http://" + arrive + "/addArrive"
const arriveListSubmitForCheckUrl = "http://" + arrive + "/modifyStateList"
//派件管理url
const getdeliverlistUrl = "http://" + deliver + "/getDistributeList"
const addDeliverlistUrl = "http://" + deliver + "/addHallRandomDistribute"
const deliverListSaveUrl = "http://" + deliver + "/addDistributeList"
const deliverListSubmitForCheckUrl = "http://" + deliver + "/modifyStateList?state=1"
//车辆管理url
const getCarListUrl = "http://" + car + "/getCarList"
const removeCarListUrl = "http://" + car + "/removeCarList"
const carListSubmitFormUrl = "http://" + car + "/addCar"
const carListSaveUrl = "http://" + car + "/modifyCarById"
//司机管理url
const getDriverListUrl = "http://" + driver + "/queryAllDriver"
const queryDriverListUrl = "http://" + driver + "/queryDriverById"
const removeDriverListUrl = "http://" + driver + "/removeDriver"
const driverListSubmitFormUrl = "http://" + driver + "/addDriver"
const driverListSaveUrl = "http://" + driver + "/modifyDriver"
const searchDriverUrl = "http://" + driver + "/queryDriverByNum"
//营收管理-收款记录url
const getCourierListUrl = "http://" + order + "/getReceiptInfo"
const getReceiptRecordUrl = "http://" + order + "/getReceiptInfo"
//营收-收款单url   
const receiptRecordSubmitFormUrl = "http://" + recipentIp + port + recipentPath + "/addReceipt"
const getReceiptListUrl = "http://" + recipentIp + port + recipentPath + "/getReceiptByOrg"
const receiptListSubmitForCheckUrl = "http://" + recipentIp + port + recipentPath + "/update"
//allApi
const api = {
  //接收管理，对到达单操作
  //待测试，根据营业厅code获取已揽件订单，没有URl
  async agetOrderList(code) {
    let response = await axios.get(agetOrderListUrl, {
      params: {
        code: code
      }
    })
    return response
  },
  async getArriveList(currentPage, pageSize) {
    let response = await axios.post(getArriveListUrl, {
      code: sessionStorage.getItem("hallCode"),
      currentPage: currentPage,
      pageSize: pageSize
    });
    return response
  },
  async arriveListSave(editItem) {
    let response = await axios.put(arriveListSaveUrl, editItem);
    console.log(response)
    return response
  },
  async arriveListRemove(sel) {
    var list = [];
    sel.forEach(element => {
      list.push(element.id);
    });
    let response = axios.delete(arriveListRemoveUrl, {
      data: list
    });
    return response
  },
  async arriveListSubmitForm(formItem) {
    let response = await axios.post(arriveListSubmitFormUrl, formItem)
    return response
  },
  async arriveListSubmitForCheck(list) {
    let response = await axios.put(arriveListSubmitForCheckUrl,

      {
        idList: list,
        state: 1
      }
    );
    return response;
  },
  //装车管理，对装车单操作
  async getOrderList(currentPage, pageSize, code) {
    let response = await axios.post(getOrderListUrl, {
      currentPage: currentPage,
      pageSize: pageSize,
      code: code
    })
    return response
  },
  //查询装车单，自测成功
  async getLoadCarList(currentPage, pageSize) {
    let response = await axios.post(getLoadCarListUrl, {
      code: sessionStorage.getItem("hallCode"),
      currentPage: currentPage,
      pageSize: pageSize
    });
    return response
  },
  //修改装车单~自测成功
  async loadcarListSave(editItem) {
    let response = await axios.put(loadcarListSaveUrl, editItem);
    return response
  },
  //添加装车单，自测成功
  async loadCarListSubmitForm(formItem) {
    let response = await axios.post(loadCarListSubmitFormUrl, formItem)
    return response
  },
  //删除装车单~自测成功
  async loadCarListRemove(sel) {
    var list = [];
    console.log(sel)
    sel.forEach(element => {
      list.push(element.id);
    });
    console.log(list)
    let response = await axios.delete(loadCarListRemoveUrl, {
      data: list
    });
    return response
  },
  //装车单提交审核~自测成功
  async loadCarListSubmitForCheck(sel) {
    let list = []
    sel.forEach(element => {
      if (element.state === 0) {
        list.push(element.id);
      }
    });
    let response = await axios.put(loadCarListSubmitForCheckmUrl, {
      state: 1,
      idList: list
    });
    return response;
  },
  //派件管理
  //查询派件单~自测成功

  async addDeliverlist() {
    let response = await axios.get(addDeliverlistUrl, {
      params: {
        departmentCode: sessionStorage.getItem('hallCode')
      }
    })
    return response
  },
  async getdeliverlist(currentPage, pageSize) {
    let response = await axios.post(getdeliverlistUrl, {
      code: sessionStorage.getItem('hallCode'),
      currentPage: currentPage,
      pageSize: pageSize
    });
    return response
  },
  //修改派件单~自测成功
  async deliverListSave(alldata) {
    let response = await axios.post(deliverListSaveUrl, alldata);
    return response
  },
  //派件单提交审核~自测成功
  async deliverListSubmitForCheck(list) {
    let response = await axios.put(deliverListSubmitForCheckUrl, {
      state: 1,
      idList: list
    });
    return response
  },
  //车辆管理
  //查询车辆单~自测成功
  async getCarList() {
    let response = await axios.get(getCarListUrl, {
      params: {
        code: sessionStorage.getItem("hallCode"),
      }
    });
    return response
  },
  //删除车辆单~自测成功
  async removeCarList(sel) {
    var idList = [];
    sel.forEach(element => {
      idList.push(element.id);
    });
    // console.log(idList)
    let response = axios.delete(removeCarListUrl, {
      data: idList
    });
    return response
  },
  //添加车辆单~自测成功
  async carListSubmitForm(formItem) {
    console.log(formItem)
    let response = await axios.post(carListSubmitFormUrl, formItem)
    return response
  },
  //保存车辆单~自测成功
  async carListSave(editItem) {
    let response = await axios.put(carListSaveUrl, editItem);
    return response
  },
  //司机管理
  //查询司机信息~与余雷测试成功
  async getDriverList(currentPage, pageSize) {
    let response = await axios.get(getDriverListUrl, {
      params: {
        code: '02500',
        currentPage: currentPage,
        pageSize: pageSize
      }

    });
    return response.data.data;
  },
  //删除司机信息~与余雷测试成功
  async removeDriverList(sel) {
    var list = [];
    sel.forEach(element => {
      list.push(element.id);
    });
    let response = axios.delete(removeDriverListUrl, {
      data: list
    });
    return response
  },
  //查询司机信息~与余雷测试成功
  async driverListSubmitForm(formItem) {
    console.log(formItem);
    let response = await axios.post(driverListSubmitFormUrl, formItem)
    return response
  },
  //修改司机信息~与余雷测试成功
  async driverListSave(editItem) {
    let response = await axios.put(driverListSaveUrl, editItem);
    return response
  },
  //未使用
  async queryDriverList(currentPage, pageSize) {
    let response = await axios.get(queryDriverListUrl, {
      params: {
        code: 1,
        currentPage: currentPage,
        pageCount: pageSize
      }

    });
    return response.data.data;
  },
  //营收管理-收款记录
  //查询快递员信息~与杨维涛测试成功
  async getCourierList() {
    let response = await axios.post(getCourierListUrl, {
      code: sessionStorage.getItem("hallCode"),
      date: new Date()
    });
    return response
  },
  //修改司机信息~与余雷测试成功
  async getReceiptRecord() {
    let response = await axios.post(getReceiptRecordUrl, {
      code: "025000",
    });
    return response
  },
  async receiptRecordSubmitForm(formItem) {
    let response = await axios.post(receiptRecordSubmitFormUrl, formItem)
    return response
  },
  //营收管理-收款单
  async getReceiptList(currentPage, pageSize) {
    let response = await axios.post(getReceiptListUrl, {
      code: "秦淮区",
      currentPage: currentPage,
      pageSize: pageSize
    });
    return response
  },
  async receiptListSubmitForCheck(id) {
    let response = await axios.post(receiptListSubmitForCheckUrl, {
      id: id,
      state: '待审核'
    });
    return response
  },
}
//export
export {
  api
}
