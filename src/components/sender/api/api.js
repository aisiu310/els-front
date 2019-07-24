import axios from "axios"
import qs from "qs"

const api = {
    //get pakingFee
    //get freight
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
    }
}
export { api }