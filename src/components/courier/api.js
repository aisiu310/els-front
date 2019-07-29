import axios from 'axios'
//ip
const ip = '192.168.2.229'
const testIP = '127.0.0.1'
//port
const port = ''
const testPort = ':9001'
//path
const distributePath = '/yuantu/logistics/distribute'
const retreatPath = ''
const collectPath = '/yuantu/business/order'
//揽件
const getAleradyCollectListUrl = "http://" + ip + testPort + collectPath + "/getCourierOrderList"
const getCollectListUrl = "http://" + ip + testPort + collectPath + "/getPendingOrderList"
const submitCollectListForCheckUrl = "http://" + ip + testPort + collectPath + "/modifyCourierInfo"
//派件
const getSenderListUrl = "http://" + ip + testPort + distributePath + "/getDistributeList"
const submitSenderListUrl = "http://" + ip + testPort + distributePath + "/modifyStateList"
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
  //查询待揽件单~与杨维涛测试成功
  async getCollectList() {
    let response = await axios.get(getCollectListUrl);
    return response
  },
  //查询已揽件单~与杨维涛测试成功
  async getAleradyCollectList(currentPage, pageSize) {
    let response = await axios.post(getAleradyCollectListUrl, {
      account: sessionStorage.getItem('courierId'),
      currentPage: currentPage,
      pageSize: pageSize
    });
    return response
  },
  //揽件单提交审核~与杨维涛测试成功
  async submitCollectListForCheck(sel) {
    let code = sel[0].code
    console.log(code)
    if (!sel.courierId) {
      let response = await axios.put(submitCollectListForCheckUrl, {
        orderCode: code,
        hallCode: sessionStorage.getItem('hallCode'),
        courierId: sessionStorage.getItem('courierId'),
        courierName: sessionStorage.getItem('courierName')
      })
      return response
    } else {
      alert('已被揽件')
    }
  },
  //查询派件单~自测成功
  async getSenderList(currentPage, pageSize) {
    let response = await axios.post(getSenderListUrl, {
      code: sessionStorage.getItem('hallCode'),
      courierId: sessionStorage.getItem('courierId'),
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
