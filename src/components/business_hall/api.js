import axios from 'axios'
//ip
const ip = '192.168.2.229'
const driverIp = '192.168.2.231'
const testIp = '127.0.0.1'
//port
const port = ':9001'
const driverPort = ':8088'
const testPort = ':9001'
//path
const carPath = '/yuantu/logistics/car'
const loadCarPath = '/yuantu/logistics/loadcar'
const arrivePath = '/yuantu/logistics/arrive'
const deliverPath = '/yuantu/logistics/distribute'
const driverPath = '/driver'
const orderPath = '/yuantu/business/order'
//装车管理url
const getLoadCarListUrl = "http://" + testIp + testPort + loadCarPath + "/getLoadingList"
const loadcarListSaveUrl = "http://" + testIp + testPort + loadCarPath + "/modifyLoadingById"
const loadCarListSubmitFormUrl = "http://" + testIp + testPort + loadCarPath + "/addLoading"
const loadCarListRemoveUrl = "http://" + testIp + testPort + loadCarPath + "/removeLoadingFake"
const loadCarListSubmitForCheckmUrl = "http://" + testIp + testPort + loadCarPath + "/modifyStateList?state=1"
//接收管理url
const getArriveListUrl = "http://" + ip + port + arrivePath + "/getArriveList"
const arriveListSaveUrl = "http://" + ip + port + arrivePath + "/modifyArriveById"
const arriveListRemoveUrl = "http://" + ip + port + arrivePath + "/removeArriveFake"
const arriveListSubmitFormUrl = "http://" + ip + port + arrivePath + "/addArrive"
const arriveListSubmitForCheckUrl = "http://" + ip + port + arrivePath + "/modifyStateList"
//派件管理url
const getdeliverlistUrl = "http://" + testIp + port + deliverPath + "/getDistributeList"
const deliverListSave = "http://" + testIp + port + deliverPath + "/modifyDistributeById"
const deliverListSubmitForCheckUrl = "http://" + testIp + port + deliverPath + "/modifyStateList?state=1"
//车辆管理url
const getCarListUrl = "http://" + testIp + port + carPath + "/getCarList"
const removeCarListUrl = "http://" + testIp + port + carPath + "/removeCarList"
const carListSubmitFormUrl = "http://" + testIp + port + carPath + "/addCar"
const carListSaveUrl = "http://" + testIp + port + carPath + "/modifyCarById"
//司机管理url
const getDriverListUrl = "http://" + driverIp + driverPort + driverPath + "/queryAllDriver"
const queryDriverListUrl = "http://" + driverIp + driverPort + driverPath + "/queryDriverById"
const removeDriverListUrl = "http://" + driverIp + driverPort + driverPath + "/removeDriver"
const driverListSubmitFormUrl = "http://" + driverIp + driverPort + driverPath + "/addDriver"
const driverListSaveUrl = "http://" + driverIp + driverPort + driverPath + "/modifyDriver"
const searchDriverUrl = "http://" + driverIp + driverPort + driverPath + "/queryDriverByNum"
//营收管理-收款记录url
const getCourierListUrl = "http://" + ip + port + orderPath + "/getReceiptInfo"
const getReceiptRecordUrl = "http://" + ip + port + orderPath + "/getReceiptInfo"
const receiptRecordSubmitFormUrl = ''
//营收灌流-收款单url
const getReceiptListUrl = ''
const receiptListSubmitForCheckUrl = ''
//allApi
const api = {
  //接收管理，对到达单操作
  async getArriveList(currentPage, pageSize) {
    let response = await axios.post(getArriveListUrl, {
      code: "025000",
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
  //查询装车单，自测成功
  async getLoadCarList(currentPage, pageSize) {
    let response = await axios.post(getLoadCarListUrl, {
      code: "025000",
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
  async getdeliverlist(currentPage, pageSize) {
    let response = await axios.post(getdeliverlistUrl, {
      code: "025000",
      currentPage: currentPage,
      pageSize: pageSize
    });
    return response
  },
  //修改派件单~自测成功
  async deliverListSave(editItem) {
    let response = await axios.put(deliverListSave, editItem);
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
        code: "025000",
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
  async getCourierList() {
    let response = await axios.post(getCourierListUrl, {
      code: sessionStorage.getItem("code"),
      date: new Date()
    });
    return response
  },
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
  async getReceiptList() {
    let response = await axios.post(getReceiptListUrl, {
      code: "025000",
    });
    return response
  },
  async receiptListSubmitForCheck(list) {
    let response = await axios.put(receiptListSubmitForCheckUrl, list);
    return response
  },
}
//export
export {
  api
}
