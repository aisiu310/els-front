import axios from "axios"
import qs from "qs"

const api = {
    // get city list
    async getCityList(URL) {
        try {
            let res = await axios.get(URL);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // get dept by city
    async getOrgByCity(URL, city) {
        try {
            let res = await axios.get(URL + city);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // add employ
    async addData(URL, newData) {
        try {
            let res = await axios.post(URL, newData);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    }
}
export { api }