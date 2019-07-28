import axios from 'axios'
import qs from 'qs'
import { url } from './url'

const api = {
    // get bank data
    async initBankData(skipCount) {
        try {
            let res = await axios.post(url.bank_getURL, { skipCount: skipCount });
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // search Bank Data
    async searchBankData(skipCount, name) {
        try {
            let res = await axios.post(url.bank_getURL, { name: name, skipCount: skipCount });
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // get data
    async initData(URL, skipCount) {
        try {
            let res = await axios.get(URL + skipCount);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // add new Data
    async addData(URL, newData) {
        try {
            let res = await axios.post(URL, newData);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // del
    async delData(URL, id) {
        try {
            let res = await axios.delete(URL + id);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // batch del
    async batchDelete(URL, id) {
        try {
            let res = await axios.delete(URL, { data: id });
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // check
    async check(URL, id) {
        try {
            let res = await axios.post(URL, { state: '待审核', id: id });
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // receipt sum
    async sumReceipt(URL, code, time) {
        try {
            let res = await axios.post(URL, { time: time, code: code });
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // calculate  for a time period
    async calculate(URL, begin, end) {
        try {
            let res = await axios.post(URL, { begin: begin, end: end });
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // check by get mothod
    async checkByGet(URL, id) {
        try {
            let parameter = qs.stringify({ id: id, state: '待审核' })
            let res = await axios.get(URL + parameter);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // get Data for a period time
    async getDataForTime(URL, begin, end, id) {
        try {
            let parameter = qs.stringify({ begin: begin, end: end, id: id })
            let res = await axios.get(URL + parameter);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // get city list
    async getCityList(URL) {
        try {
            let res = await axios.get(URL);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // get org by city
    async getOrgByCity(URL, city) {
        try {
            let res = await axios.get(URL + city);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // update rent through put
    async updateRent(URL, obj) {
        try {
            let res = await axios.post(URL, obj);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // get total rent for a city
    async getTotalRent(URL, city) {
        try {
            let res = await axios.get(URL + city);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // get salary by org
    async getSalaryByOrg(URL, org, currentPage) {
        try {
            let parameter = qs.stringify({ name: org, currentPage: currentPage, pageSize: 10 })
            let res = await axios.get(URL + parameter);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // batch delete salary
    async batchDeleteSalary(URL, deleteId) {
        try {
            let res = await axios.delete(URL, { data: deleteId });
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    async updateSalary(URL, obj) {
        try {
            let res = await axios.put(URL, obj);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    }
}
export { api }