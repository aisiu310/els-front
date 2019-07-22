import axios from 'axios'
import qs from 'qs'
import { url } from './url'
import { checkServerIdentity } from 'tls';

const api = {
    // get bank data
    async initBankData(skipCount) {
        try {
            let res = await axios.post(url.bank_getURL, { skipCount: skipCount });
            return res.data.data;
        } catch (error) {
            alert("服务器出错！");
        }
    },
    // search Bank Data
    async searchBankData(skipCount, name) {
        try {
            let res = await axios.post(url.bank_getURL, { name: name, skipCount: skipCount });
            return res.data.data;
        } catch (error) {
            alert("服务器出错！")
            console.log(error);
        }
    },
    // get data
    async initData(URL, skipCount) {
        try {
            let res = await axios.get(URL + skipCount);
            return res.data.data;
        } catch (error) {
            alert("服务器出错！");
        }
    },
    // add new Data
    async addData(URL, newData) {
        try {
            let res = await axios.post(URL, newData);
            return res.data.data;
        } catch (error) {
            alert("服务器出错！");
            console.log(error);
        }
    },
    // del
    async delData(URL, id) {
        try {
            let res = await axios.delete(URL + id);
            return res.data.data;
        } catch (error) {
            alert("服务器出错！");
            console.log(error);
        }
    },
    // batch del
    async batchDelete(URL, id) {
        try {
            let res = await axios.delete(URL, { data: id });
            return res.data.data;
        } catch (error) {
            alert("服务器出错！");
            console.log(error);
        }
    },
    // check
    async check(URL, id) {
        try {
            let res = await axios.post(URL, { state: '待审核', id: id });
            return res.data.data;
        } catch (error) {
            alert("服务器出错！");
            console.log(error);
        }
    }
}
export { api }