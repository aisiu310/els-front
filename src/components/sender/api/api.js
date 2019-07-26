import axios from "axios"
import qs from "qs"

const api = {
    // get all order
    async initData(URL, phone, skip, pageSize) {
        try {
            let res = await axios.post(URL, { account: phone, currentPage: skip, pageSize: pageSize });
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // pay
    async addOrder(URL, newData) {
        try {
            let res = await axios.post(URL, newData);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // calculate fee
    async calculateTotalFreight(URL, cityA, cityB, economy_type, weight) {
        try {
            let parameter = qs.stringify({ cityA: cityA, cityB: cityB, economy_type: economy_type, weight: weight });
            let res = await axios.get(URL + parameter);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // init data by get and no parameter
    async initData(URL) {
        try {
            let res = await axios.get(URL);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // delete data by id
    async delData(URL, id) {
        try {
            let res = await axios.delete(URL + id);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // add data by post
    async addData(URL, obj) {
        try {
            let res = await axios.post(URL, obj);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // init data with account
    async initAddress(URL, account) {
        try {
            let res = await axios.get(URL + account);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
}
export { api }