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
    receipt_sumURL: api + "/receipt/sum",
    receipt_calculateURL: api + "/receipt/calculate",
    // pay
    pay_calculateURL: api + "/pay/calculate",
    pay_getURL: api + "/pay/getAllPay?skip=",
    pay_checkURL: api + "/pay/update?",
    pay_delURL: api + "/pay/batchDelete",
    pay_getDataForTimeURL: api + "/pay/getReceiptBetweenTime?",
    pay_addURL: api + "/pay/addPay"
}
export { url }