const api = "http://localhost:8021"
const url = {
    // bank url
    bank_addURL: api + "/bank/addBankAccount",
    bank_delURL: api + "/bank/deleteBankAccount?id=",
    bank_getURL: api + "/bank/getBankAccount",
    // enterprise
    enterprise_getURL: api + "/enterprise/getAllEnterprise?skipCount=",
    enterprise_addURL: api + "/enterprise/addEnterprise"

}
export { url }