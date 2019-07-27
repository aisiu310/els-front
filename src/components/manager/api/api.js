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
    async addData(URL, newData) {
        try {
            let res = await axios.post(URL, newData);
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
    // add org
    async addOrg(URL, newOrg) {
        try {
            let res = await axios.post(URL, newOrg);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // valid id
    async validId(URL, id) {
        try {
            let res = await axios.get(URL + id);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // add data by get
    async addCityByGet(URL, para) {
        try {
            let res = await axios.get(URL + para);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // add distance by get
    async addDistanceByGet(URL, name1, name2, distance) {
        try {
            let parameter = qs.stringify({ cityA: name1, cityB: name2, distance: distance });
            let res = await axios.get(URL + parameter);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // update postage by put
    async updatePostage(URL, obj) {
        try {
            let res = await axios.put(URL, obj);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
    // get finance data by post through statePO
    async getDataToManager(URL, obj) {
        try {
            let res = await axios.post(URL, obj);
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },
}
export { api }