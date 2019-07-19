const api = "http://localhost:8031"
const url = {
    // outInventory url
    out_addURL: api + "/outInventory/addOutInventory",
    out_delURL: api + "/outInventory/batchDelete",
    out_checkURL: api + "/outInventory/checkOutInventory",
    out_getURL: api + "/outInventory/getOutInventory?",
    out_getByTimeURL: api + "/outInventory/getOutInventoryByTime?",
    // Inventory Warn Line
    getCapacity: api + "/inventory/getCapacity?",
    setWarnLine: api + "/inventory/setWarnLine?",
    getWarnLine: api + "/inventory/getWarnLine?",
    // Inventory
    getURL: api + "/inventory/getInventory?",
    getAllURL: api + "/inventory/getAllInventory?",
    // inInventory: 
    in_addURL: api + "/inInventory/addInInventory",
    in_delURL: api + "/inInventory/batchDelete",
    in_checkURL: api + "/inInventory/checkInInventory",
    in_getURL: api + "/inInventory/getInInventory?",
    in_getByTimeURL: api + "/inInventory/getInInventoryByTime?",

}
export { url }