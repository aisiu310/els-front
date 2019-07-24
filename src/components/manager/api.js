import axios from 'axios'

const getPeopleListUrl = "http://192.168.2.231:8088/employee/queryEmployee"
const searchUrl = "http://192.168.2.231:8088/employee/queryEmployee"
const removePeopleListUrl = ''
const peopleListSaveUrl = ''
const peopleListSubmitFormUrl = ''
const getOrganListUrl = ''
const removeOrganListUrl = ''
const organListSaveUrl = ''
const organListSubmitFormUrl = ''
const getSalaryListUrl = ''
const removeSalaryListUrl = ''
const salaryListSaveUrl = ''
const salaryListSubmitFormUrl = ''

const getChargeListUrl = ''
const removeChargeListUrl = ''
const chargeListSaveUrl = ''
const chargeListSubmitFormUrl = ''

const api = {
  async getPeopleList(currentPage, pageSize) {
    let response = await axios.get(getPeopleListUrl, {
      GetEmployeePO: {
        currentPage: currentPage,
        pageSize: pageSize
      }
    });
    return response
  },
  async search(option, inputdata, currentPage, pageSize) {
    let id = '';
    let job = '';
    let name = '';
    if (option === id) {
      id === inputdata;
    } else if (option === job) {
      job === inputdata;
    } else {
      name === inputdata;
    }
    let response = await axios.get(searchUrl, {
      GetEmployeePO: {
        state: 1,
        id: id,
        job: job,
        name: name,
        currentPage: currentPage,
        pageSize: pageSize
      }
    });
    return response
  },
  async removePeopleList(sel) {
    let list = [];
    sel.forEach(element => {
      list.push(element.id);
    });
    let response = axios.delete(removePeopleListUrl, {
      data: list
    });
    return response
  },
  async peopleListSave(editItem) {
    let response = await axios.put(peopleListSaveUrl, editItem);
    return response
  },
  async peopleListSubmitForm(formItem) {
    let response = await axios.post(peopleListSubmitFormUrl, formItem)
    return response
  },
  async getOrganList(currentPage, pageSize) {
    let response = await axios.get(getOrganListUrl, {
      GetEmployeePO: {
        currentPage: currentPage,
        pageSize: pageSize
      }
    });
    return response
  },
  async removeOrganList(sel) {
    let list = [];
    sel.forEach(element => {
      list.push(element.id);
    });
    let response = axios.delete(removeOrganListUrl, {
      data: list
    });
    return response
  },
  async organListSave(editItem) {
    let response = await axios.put(organListSaveUrl, editItem);
    return response
  },
  async organListSubmitForm(formItem) {
    let response = await axios.post(organListSubmitFormUrl, formItem)
    return response
  },
  async getSalaryList(currentPage, pageSize) {
    let response = await axios.get(getSalaryListUrl, {
      GetEmployeePO: {
        currentPage: currentPage,
        pageSize: pageSize
      }
    });
    return response
  },
  async removeSalaryList(sel) {
    let list = [];
    sel.forEach(element => {
      list.push(element.id);
    });
    let response = axios.delete(removeSalaryListUrl, {
      data: list
    });
    return response
  },
  async salaryListSave(editItem) {
    let response = await axios.put(salaryListSaveUrl, editItem);
    return response
  },
  async salaryListSubmitForm(formItem) {
    let response = await axios.post(salaryListSubmitFormUrl, formItem)
    return response
  },

  async getChargeList(currentPage, pageSize) {
    let response = await axios.get(getChargeListUrl, {
      GetEmployeePO: {
        currentPage: currentPage,
        pageSize: pageSize
      }
    });
    return response
  },
  async removeChargeList(sel) {
    let list = [];
    sel.forEach(element => {
      list.push(element.id);
    });
    let response = axios.delete(removeChargeListUrl, {
      data: list
    });
    return response
  },
  async chargeListSave(editItem) {
    let response = await axios.put(chargeListSaveUrl, editItem);
    return response
  },
  async chargeListSubmitForm(formItem) {
    let response = await axios.post(chargeListSubmitFormUrl, formItem)
    return response
  },
}

export {
  api
}
