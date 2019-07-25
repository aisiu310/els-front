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
    },
    // get employee by like
    async getEmployee(URL, parameter) {
        try {
            let res = await axios.post(URL, parameter);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // reset and del through id
    async updateEmployee(URL, id) {
        try {
            let res = await axios.put(URL + id);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    }
}
export { api }