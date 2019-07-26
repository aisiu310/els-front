import axios from "axios"
// axios.defaults.headers.post['Content-Type'] = 'text/plain'
const ip = '192.168.2.229'
const port = '9001'
const arrivePath = 'yuantu/logistics/arrive'
const loadCarPath = 'yuantu/logistics/loadcar'

const transferPath = 'yuantu/logistics/transfer'

const getArriveListUrl = "http://" + ip + ":" + port + "/" + arrivePath + "/getArriveList"
const arriveListSaveUrl = "http://" + ip + ":9001/" + arrivePath + "/modifyArriveById"
const arriveListRemoveUrl = "http://" + ip + ":9001/" + arrivePath + "/removeArriveFake"
const arriveListSubmitFormUrl = "http://" + ip + ":9001/" + arrivePath + "/addArrive"
const arriveListSubmitForCheckUrl = "http://" + ip + ":9001/" + arrivePath + "/modifyStateList"



const getLoadCarListUrl = "http://" + ip + ":9001/" + loadCarPath + "/getLoadingList"
const loadcarListSaveUrl = 'http://192.168.2.229/yuantu/logistics/loadcar/modifyLoadingById'
const loadCarListSubmitFormUrl = 'http://192.168.2.229:9001/yuantu/logistics/loadcar/addLoading'
const loadCarListRemoveUrl = 'http://192.168.2.229/yuantu/logistics/loadcar/removeLoadingFake'
const loadCarListSubmitForCheckmUrl = 'http://192.168.2.229/loadcar/modifyStateList?state=1'

const getTransferListUrl = "http://" + ip + ":" + port + "/" + transferPath + "/getTransferList"
const transferListSaveUrl = "http://localhost:9001/" + transferPath + "/modifyDistributeById"
const transferListSubmitFormUrl = "http://localhost:9001/" + transferPath + "/addTransfer"
const transferListRemoveUrl = "http://localhost:9001/" + transferPath + "/removeDistributeFake"
const transferListSubmitForCheckUrl = "http://localhost:9001/" + transferPath + "/modifyStateList"

const api = {
  async getTransferList(currentPage, pageSize) {
    let response = await axios.post(
      getTransferListUrl, {
        code: "18003",
        currentPage: 1,
        pageSize: 10

      }
    );
    return response
  },
  async transferListSave(editItem) {
    let response = await axios.put(transferListSaveUrl, editItem);
    return response
  },
  async transferListSubmitForm(formItem) {
    let response = await axios.post(transferListSubmitFormUrl, formItem)
    return response
  },
  async transferListRemove(sel) {
    var list = [];
    console.log(sel)
    sel.forEach(element => {
      list.push(element.id);
    });
    console.log(list)
    let response = await axios.delete(transferListRemoveUrl, list);
    return response
  },
  async transferListSubmitForCheck(sel) {
    let list = []
    sel.forEach(element => {
      if (element.state === 0) {
        list.push(element.id);
      }
    });
    let response = await axios.put(transferListSubmitForCheckUrl, list);
    return response;
  },

  async getArriveList(currentPage, pageSize) {
    let response = await axios.get(getArriveListUrl, {
      GetEmployeePO: {
        currentPage: currentPage,
        pageSize: pageSize
      }
    });
    return response
  },
  async arriveListSave(editItem) {
    let response = await axios.put(arriveListSaveUrl, editItem);
    return response
  },
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
  async arriveListSubmitForm(formItem) {
    let response = await axios.post(arriveListSubmitFormUrl, formItem)
    return response
  },
  async arriveListSubmitForCheck(sel) {
    let list = []
    sel.forEach(element => {
      if (element.state === 0) {
        list.push(element.id);
      }
    });
    let response = await axios.put(arriveListSubmitForCheckUrl, list);
    return response;
  },
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


}

export {
  api
}
