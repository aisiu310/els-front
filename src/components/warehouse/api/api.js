import axois from 'axios'
import QS from 'qs'
import { url } from './url'

const api = {
    // init data from server
    async initData(page) {
        try {
            let skip = QS.stringify({ skipCount: page });
            let res = await axois.get(url.out_getURL + skip);
            return res.data.data;
        } catch (error) {
            alert('服务器出错');
            console.log(error);
        }
    },
    // as function name
    async batchDelete(idList) {
        try {
            let res = await axois.delete(url.out_delURL, { data: idList });
            console.log(res.data.msg);
            return res.data.data;
        } catch (error) {
            alert('服务器出错');
            console.log(error);
        }
    },
    // as function name
    async checkData(checkId) {
        try {
            let res = await axois.get(url.out_checkURL, { params: { state: '待审核', id: checkId } });
            console.log(res.data.data);
            return res.data.data;
        } catch (error) {
            alert('服务器出错');
            console.log(error);
        }
    },
    // as function name
    async addData(newData) {
        try {
            let res = await axois.post(url.out_addURL, newData);
            console.log(res.data.data);
            return res.data.data;
        } catch (error) {
            alert('服务器出错');
            console.log(error);
        }
    },
    // as function name
    async getDataBetweenTime(begin, end, page) {
        try {
            let parameter = QS.stringify({ begin: begin, end: end, skipCount: page });
            let res = await axois.get(url.out_getByTimeURL + parameter);
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
    async getAllInventory(inventoryName, limitTime, skipCount) {
        try {
            let parameter = QS.stringify({ inventoryName: inventoryName, limitTime: limitTime, skipCount: skipCount });
            let res = await axois.get(url.getAllURL + parameter);
            return res.data.data;
        } catch (error) {
            alert("服务器出错");
        }
    }
}
export { api };