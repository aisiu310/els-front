import axois from 'axios'
import QS from 'qs'
import { url } from './url'

const api = {
    // init data from server
    async initData(URL, page) {
        try {
            let skip = QS.stringify({ skipCount: page });
            let res = await axois.get(URL + skip);
            return res.data.data;
        } catch (error) {
            alert('服务器出错');
            console.log(error);
        }
    },
    // as function name
    async batchDelete(URL, idList) {
        try {
            let res = await axois.delete(URL, { data: idList });
            console.log(res.data.msg);
            return res.data.data;
        } catch (error) {
            alert('服务器出错');
            console.log(error);
        }
    },
    // as function name
    async checkData(URL, checkId) {
        try {
            let res = await axois.get(URL, { params: { state: '待审核', id: checkId } });
            console.log(res.data.data);
            return res.data.data;
        } catch (error) {
            alert('服务器出错');
            console.log(error);
        }
    },
    // as function name
    async addData(URL, newData) {
        try {
            let res = await axois.post(URL, newData);
            return res.data.data;
        } catch (error) {
            alert('服务器出错');
            console.log(error);
        }
    },
    // as function name
    async getDataBetweenTime(URL, begin, end, page) {
        try {
            let parameter = QS.stringify({ begin: begin, end: end, skipCount: page });
            let res = await axois.get(URL + parameter);
            // console.log(res.data.data);
            return res.data.data;
        } catch (error) {
            alert('服务器出错');
            console.log(error);
        }
    },
    // get current inventory Line
    async getInventoryCapacity(inventoryName) {
        try {
            let parameter = QS.stringify({ inventoryName: inventoryName });
            let res = await axois.get(url.getCapacity + parameter);
            return res.data.data;
        } catch (error) {
            alert("服务器出错");
        }
    },
    // set inventory warn line
    async setInventoryLine(inventoryName, warnLine) {
        try {
            let parameter = QS.stringify({ inventoryName: inventoryName, warnLine: warnLine });
            let res = await axois.get(url.setWarnLine + parameter);
            return res.data.data;
        } catch (error) {
            alert("服务器出错");
        }
    },
    // get current inventory warn line
    async getWarnLine(inventoryName) {
        try {
            let parameter = QS.stringify({ inventoryName: inventoryName });
            let res = await axois(url.getWarnLine + parameter);
            return res.data.data;
        } catch (error) {
            alert("服务器出错");
        }
    },
    // Get Inventory information by area
    async getInventory(area, inventoryName, skipCount) {
        try {
            let parameter = QS.stringify({ area: area, inventoryName: inventoryName, skipCount: skipCount });
            let res = await axois.get(url.getURL + parameter);
            return res.data.data;
        } catch (error) {
            alert("服务器出错");
        }
    },
    // Get Inventory information All
    async getAllInventory(inventoryName, limitTime) {
        try {
            let parameter = QS.stringify({ inventoryName: inventoryName, limitTime: limitTime });
            let res = await axois.get(url.getAllURL + parameter);
            return res.data.data;
        } catch (error) {
            alert("服务器出错");
        }
    }
}
export { api };