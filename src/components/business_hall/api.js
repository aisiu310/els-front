import axios from 'axios'
const ip = '192.168.2.229:'
const port = '9001'
const path = 'yuantu/logistics/car'

const getLoadCarListUrl = 'http://192.168.2.229:9001/yuantu/logistics/loadcar/getLoadingList'
const loadcarListSaveUrl = 'http://192.168.2.229/yuantu/logistics/loadcar/modifyLoadingById'
const loadCarListSubmitFormUrl = 'http://192.168.2.229:9001/yuantu/logistics/loadcar/addLoading'
const loadCarListRemoveUrl = 'http://192.168.2.229/yuantu/logistics/loadcar/removeLoadingFake'
const loadCarListSubmitForCheckmUrl = 'http://192.168.2.229/loadcar/modifyStateList?state=1'

const getArriveListUrl = "http://192.168.2.229:9001/yuantu/logistics/arrive/getArriveList"
const arriveListSaveUrl = "http://192.168.2.229:9001/yuantu/logistics/arrive/modifyArriveById"
const arriveListRemoveUrl = "http://192.168.2.229:9001/yuantu/logistics/arrive/removeArriveFake"
const arriveListSubmitFormUrl = "http://192.168.2.229:9001/yuantu/logistics/arrive/addArrive"
const arriveListSubmitForCheckUrl = "http://192.168.2.229:9001/yuantu/logistics/arrive/modifyStateList"

const getdeliverlistUrl = "http://192.168.2.229:9001/yuantu/logistics/distribute/getDistributeList"
const deliverListSave = "http://192.168.2.229:9001/yuantu/logistics/distribute/modifyDistributeById"
const deliverListSubmitForCheckUrl = "http://192.168.2.229:9001/yuantu/logistics/distribute/modifyStateList?state=1"

const getCarListUrl = "http://localhost:9001/" + path + "/getCarList"
const removeCarListUrl = "http://localhost:9001/" + path + "/removeCarList"
const carListSubmitFormUrl = "http://localhost:9001/" + path + "/addCar"
const carListSaveUrl = "http://localhost:9001/" + path + "/modifyCarById"


const getDriverListUrl = "http://192.168.2.231:8088/driver/queryAllDriver"
const queryDriverListUrl = "http://192.168.2.231:8088/driver/queryDriverById"
const removeDriverListUrl = 'http://192.168.2.231:8088/driver/removeDriver'
const driverListSubmitFormUrl = 'http://192.168.2.231:8088/driver/addDriver'
const driverListSaveUrl = 'http://192.168.2.231:8088/driver/modifyDriver'

const getCourierListUrl = ''
const getReceiptRecordUrl = ''
const receiptRecordSubmitFormUrl = ''

const getReceiptListUrl = ''
const receiptListSubmitForCheckUrl = ''

const api = {
  async getLoadCarList(currentPage, pageSize) {
    let response = await axios.post(getLoadCarListUrl, {
      code: "025000",
      currentPage: currentPage,
      pageSize: pageSize
    });
    return response
  },
  async loadcarListSave(editItem) {
    let response = await axios.put(loadcarListSaveUrl, editItem);
    return response
  },
  async loadCarListSubmitForm(formItem) {
    let response = await axios.post(loadCarListSubmitFormUrl, formItem)
    return response
  },
  async loadCarListRemove(sel) {
    var list = [];
    console.log(sel)
    sel.forEach(element => {
      list.push(element.id);
    });
    console.log(list)
    let response = await axios.delete(loadCarListRemoveUrl, list);
    return response
  },
  async loadCarListSubmitForCheck(sel) {
    let list = []
    sel.forEach(element => {
      if (element.state === 0) {
        list.push(element.id);
      }
    });
    let response = await axios.put(loadCarListSubmitForCheckmUrl, list);
    return response;
  },
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
  async getdeliverlist(currentPage, pageSize) {
    let response = await axios.post(getdeliverlistUrl, {
      code: "025000",
      currentPage: currentPage,
      pageCount: pageSize
    });
    return response
  },
  async deliverListSave(editItem) {
    let response = await axios.put(deliverListSave, editItem);
    return response
  },
  async deliverListSubmitForCheck(list) {
    let response = await axios.put(deliverListSubmitForCheckUrl, list);
    return response
  },
  async getCarList() {
    let response = await axios.get(getCarListUrl, {
      params: {
        code: "025000",
      }
    });
    return response
  },
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
  async carListSubmitForm(formItem) {
    console.log(formItem)
    let response = await axios.post(carListSubmitFormUrl, formItem)
    return response
  },
  async carListSave(editItem) {
    let response = await axios.put(carListSaveUrl, editItem);
    return response
  },
  async getDriverList(currentPage, pageSize) {
    let response = await axios.get(getDriverListUrl, {
      params: {
        code: 1,
        currentPage: currentPage,
        pageCount: pageSize
      }

    });
    return response.data.data;
  },
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
  async driverListSubmitForm(formItem) {
    console.log(formItem);
    let response = await axios.post(driverListSubmitFormUrl, formItem)
    return response
  },
  async driverListSave(editItem) {
    let response = await axios.put(driverListSaveUrl, editItem);
    return response
  },
  async getCourierList() {
    let response = await axios.post(getCourierListUrl, {
      code: "025000",
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
  // async getReceiptRecord() {
  //   let response = await axios.post(getReceiptRecordUrl, {
  //     code: "025000",
  //   });
  //   return response
  // },
  // async receiptRecordSubmitForm(formItem) {
  //   let response = await axios.post(receiptRecordSubmitFormUrl, formItem)
  //   return response
  // },

  // async removeDriverList(sel) {
  //   var list = [];
  //   sel.forEach(element => {
  //     list.push(element.id);
  //   });
  //   let response = axios.delete(removeDriverListUrl, {
  //     data: list
  //   });
  //   return response
  // },
  // async driverListSubmitForm(formItem) {
  //   let response = await axios.post(driverListSubmitFormUrl, formItem)
  //   return response
  // },
  // async driverListSave(editItem) {
  //   let response = await axios.put(driverListSaveUrl, editItem);
  //   return response
  // },
}
export {
  api
}
