import axios from 'axios'
const distributePath = 'yuantu/logistics/distribute'

const getCollectListUrl = "http://localhost:9001/" + distributePath + "/getSenderOrderList"
const submitCollectListUrl = ''

const getSenderListUrl = "http://localhost:9001/" + distributePath + "/getDistributeList"
const submitSenderListUrl = "http://localhost:9001/" + distributePath + "/addDistribute"
const api = {
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
  async getSenderList(currentPage, pageSize) {
    let response = await axios.post(getSenderListUrl, {

      code: '025000',
      currentPage: currentPage,
      pageSize: pageSize

    });
    return response
  },
  async submitSenderList(formItem) {
    let response = await axios.post(submitSenderListUrl, formItem)
    return response
  },
}

export {
  api
}
