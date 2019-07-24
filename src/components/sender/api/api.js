import axios from "axios"
import qs from "qs"

const api = {
    //get pakingFee
    //get freight
    // pay
    async addOrder(URL, newData) {
        try {
            let res = await axios.post(URL, newData);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    }
}
export { api }