import axios from "axios"
import qs from "qs"

const api = {
    // get data pass page
    async initData(URL) {
        try {
            let res = await axios.get(URL);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // update
    async updateData(URL, obj) {
        try {
            let res = await axios.post(URL, obj);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // delete
    async delData(URL, para) {
        try {
            let res = await axios.delete(URL + para);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },

}
export { api }