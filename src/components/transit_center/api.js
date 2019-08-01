import axios from "axios"
// axios.defaults.headers.post['Content-Type'] = 'text/plain'
//ip
const ip = '192.168.2.229'
const testIp = '127.0.0.1'
//port
const port = ':9001'
const testPort = ':9001'
//path
const arrivePath = '/yuantu/logistics/arrive'
const loadCarPath = '/yuantu/logistics/loadcar'
const transferPath = '/yuantu/logistics/transfer'
//接收管理url
const getArriveListUrl = "http://" + ip + port + arrivePath + "/getArriveList"
const arriveListSaveUrl = "http://" + ip + port + arrivePath + "/modifyArriveById"
const arriveListRemoveUrl = "http://" + ip + port + arrivePath + "/removeArriveFake"
const arriveListSubmitFormUrl = "http://" + ip + port + arrivePath + "/addArrive"
const arriveListSubmitForCheckUrl = "http://" + ip + port + arrivePath + "/modifyStateList"
//装车管理url
const getLoadCarListUrl = "http://" + ip + port + loadCarPath + "/getLoadingList"
const loadcarListSaveUrl = "http://" + ip + port + loadCarPath + "/modifyLoadingById"
const loadCarListSubmitFormUrl = "http://" + ip + port + loadCarPath + "/addLoading"
const loadCarListRemoveUrl = "http://" + ip + port + loadCarPath + "/removeLoadingFake"
const loadCarListSubmitForCheckmUrl = "http://" + ip + port + loadCarPath + "/modifyStateList?state=1"
//中转管理url
// const getTransferListUrl = "http://" + ip + ":" + port + "/" + transferPath + "/getTransferList"
const getTransferListUrl = "http://" + ip + testPort + transferPath + "/getTransferList"
const transferListSaveUrl = "http://" + ip + testPort + transferPath + "/modifyTransferById"
const transferListSubmitFormUrl = "http://" + ip + testPort + transferPath + "/addTransfer"
const transferListRemoveUrl = "http://" + ip + testPort + transferPath + "/removeTransferFake"
const transferListSubmitForCheckUrl = "http://" + ip + testPort + transferPath + "/modifyStateList"
//allApi
const api = {
  //接收管理
  //待测试，根据中转中心code获取来自其他营业厅/中转中心的装车单，没有URl
  async agetLoadCarList(code) {
    let response = await axios.get(agetLoadCarListUrl, {
      params: {
        code: code
      }
    })
    return response
  },
  //待测试，根据中转中心code获取出库单，没有URl
  async getWareHouseList(code) {
    let response = await axios.get(getWareHouseListUrl, {
      params: {
        code: code
      }
    })
    return response
  },
  //查询到达单~自测成功
  async getArriveList() {
    let response = await axios.post(getArriveListUrl, {
      // GetEmployeePO: {
      //   currentPage: currentPage,
      //   pageSize: pageSize
      // }
      code: sessionStorage.getItem("hallCode"),
      currentPage: currentPage,
      pageSize: pageSize
    });
    return response
  },
  //修改到达单~自测成功
  async arriveListSave(editItem) {
    let response = await axios.put(arriveListSaveUrl, editItem);
    return response
  },
  //删除到达单~自测成功
  async arriveListRemove(sel) {
    let list = [];
    sel.forEach(element => {
      list.push(element.id);
    });
    let response = axios.delete(arriveListRemoveUrl, {
      data: list
    });
    return response
  },
  //添加到达单~修改
  async arriveListSubmitForm(formItem) {
    let response = await axios.post(arriveListSubmitFormUrl, formItem)
    return response
  },
  //报错~Query was empty
  async arriveListSubmitForCheck(sel) {
    let list = []
    sel.forEach(element => {
      if (element.state === 0) {
        list.push(element.id);
      }
    });
    let response = await axios.put(arriveListSubmitForCheckUrl, {
      state: '1',
      idList: list
    });
    return response;
  },
  //装车管理
  //查询装车单~自测成功
  async getLoadCarList(currentPage, pageSize) {
    let response = await axios.post(getLoadCarListUrl, {
      code: sessionStorage.getItem('hallCode'),
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
  //添加装车单~自测成功
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
      state: '1',
      idList: list
    });
    return response;
  },
  //中转管理
  //查询中转单~自测成功
  async getTransferList(currentPage, pageSize) {
    let response = await axios.post(
      getTransferListUrl, {
        code: sessionStorage.getItem('hallCode'),
        currentPage: currentPage,
        pageSize: pageSize

      }
    );
    return response
  },
  //修改中转单~自测成功
  async transferListSave(editItem) {
    let response = await axios.put(transferListSaveUrl, editItem);
    return response
  },
  //添加中转单~自测成功
  async transferListSubmitForm(formItem) {
    let response = await axios.post(transferListSubmitFormUrl, formItem)
    return response
  },
  //删除中转单~自测成功
  async transferListRemove(sel) {
    var list = [];
    console.log(sel)
    sel.forEach(element => {
      list.push(element.id);
    });
    console.log(list)
    let response = await axios.delete(transferListRemoveUrl, {
      data: list
    });
    return response
  },
  //中转单提交审核~自测成功
  async transferListSubmitForCheck(sel) {
    let list = []
    sel.forEach(element => {
      if (element.state === 0) {
        list.push(element.id);
      }
    });
    let response = await axios.put(transferListSubmitForCheckUrl, {
      idList: list,
      state: 1
    });
    return response;
  },
}
//export
export {
  api
}
