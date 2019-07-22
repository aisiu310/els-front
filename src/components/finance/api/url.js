const api = "http://localhost:8021"
const url = {
    // bank url
    bank_addURL: api + "/bank/addBankAccount",
    bank_delURL: api + "/bank/deleteBankAccount?id=",
    bank_getURL: api + "/bank/getBankAccount",
    // enterprise
    enterprise_getURL: api + "/enterprise/getAllEnterprise?skipCount=",
    enterprise_addURL: api + "/enterprise/addEnterprise",
    // receipt
    receipt_getURL: api + "/receipt/getAllReceipt?skip=",
    receipt_delURL: api + "/receipt/batchDelete",
    receipt_checkURL: api + "/receipt/update",

}
export { url }