import axios from 'axios'
//ip
const ip = ''
const testIP = '127.0.0.1'
//port
const port = ''
const testPort = ':9001'
//path
const distributePath = '/yuantu/logistics/distribute'
const retreatPath = ''
//揽件
const getCollectListUrl = "http://" + testIP + testPort + distributePath + "/getDistributeList"
const submitCollectListUrl = ''
//派件
const getSenderListUrl = "http://" + testIP + testPort + distributePath + "/getDistributeList"
const submitSenderListUrl = "http://" + testIP + testPort + distributePath + "/modifyStateList"
//退件
const retreatListUrl = "http://" + testIP + testPort + retreatPath + "/modifyStateList"
//api
const api = {
  async retreatList(currentPage, pageSize) {
    let response = await axios.post(retreatListUrl, {
      code: '025000',
      currentPage: currentPage,
      pageSize: pageSize
    });
    return response
  },
  async getCollectList(currentPage, pageSize) {
    let response = await axios.post(getCollectListUrl, {
      code: '025000',
      currentPage: currentPage,
      pageSize: pageSize
    });
    return response
  },
  async submitCollectList(sel) {
    let list = [];
    sel.forEach(element => {
      if (element.state === 0) {
        list.push(element.id);
      }
    });
    let response = await axios.post(submitCollectListUrl, list)
    return response
  },
  //查询派件单~自测成功
  async getSenderList(currentPage, pageSize) {
    let response = await axios.post(getSenderListUrl, {
      code: '025000',
      currentPage: currentPage,
      pageSize: pageSize
    });
    return response
  },
  async submitSenderListForCheck(sel) {
    let list = []
    sel.forEach(element => {
      if (element.state === 0) {
        list.push(element.id);
      }
    });
    let response = await axios.put(submitSenderListUrl, {
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
