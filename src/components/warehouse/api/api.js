import axois from 'axios'
// import QS from 'qs'

const addURL = "http://localhost:8031/outInventory/addOutInventory"

const delURL = "http://localhost:8031/outInventory/batchDelete"

const checkURL = "http://localhost:8031/outInventory/checkOutInventory"

const getURL = "http://localhost:8031/outInventory/getOutInventory?skipCount="

const api = {
    // init data from server
    async initData(page) {
        try {
            let res = await axois.get(getURL + page);
            return res.data.data;
        } catch (error) {
            alert('服务器出错');
            console.log(error);
        }
    },
    // as function name
    async batchDelete(idList) {
        try {
            let res = await axois.delete(delURL, idList);
            return res.data.data;
        } catch (error) {
            alert('服务器出错');
            console.log(error);
        }
    },
    // as function name
    async checkData(checkId) {
        try {
            let res = await axois.get(checkURL, { params: { state: '待审核', id: checkId } });
            return res.data.data;
        } catch (error) {
            alert('服务器出错');
            console.log(error);
        }
    },
    async addData(newData) {
        try {
            let res = await axois.post(addURL, newData);
            return res.data.data;
        } catch (error) {
            alert('服务器出错');
            console.log(error);
        }
    }
}
export { api };