import axios from 'axios'

const getCollectListUrl = ''
const submitCollectListUrl = ''
const getSenderListUrl = ''
const submitSenderListUrl = ''
const api = {
  async getCollectList(currentPage, pageSize) {
    let response = await axios.get(getCollectListUrl, {
      params: {
        currentPage: currentPage,
        pageSize: pageSize
      }
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
    let response = await axios.get(getSenderListUrl, {
      params: {
        currentPage: currentPage,
        pageSize: pageSize
      }
    });
    return response
  },
  async submitSenderList(sel) {
    let list = [];
    sel.forEach(element => {
      if (element.state === 0) {
        list.push(element.id);
      }
    });
    let response = await axios.post(submitSenderListUrl, list)
    return response
  },



}

export {
  api
}
