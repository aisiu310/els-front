const api = "http://localhost:9001/yuantu/finance";
const yulei = "http://192.168.2.231:8088"
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
    receipt_addURL: api + "/receipt/addReceipt",
    // pay
    pay_calculateURL: api + "/pay/calculate",
    pay_getURL: api + "/pay/getAllPay?skip=",
    pay_checkURL: api + "/pay/update?",
    pay_delURL: api + "/pay/batchDelete",
    pay_getDataForTimeURL: api + "/pay/getReceiptBetweenTime?",
    pay_addURL: api + "/pay/addPay",
    // rent
    rent_getCityURL: yulei + "/employeeSalary/queryAllDepartment",
    rent_getOrganizationURL: yulei + "/organization/queryOrganizationByBelong?belong=",
    rent_updateRentURL: yulei + "/organization/modifyOrganizationByFinance",
    rent_totalRentURL: yulei + "/organization/queryRentByBelong?belong=",
    // salary
    salary_getAllURL: yulei + "/employeeSalary/queryEmployeeSalaryByOrg?",
    salary_delURL: yulei + "/employeeSalary/removeEmployeeSalary",
    salary_totalURL: yulei + "/employeeSalary/queryTotalByOrg?name=",
    salary_updateURL: yulei + "/employeeSalary/modifyEmployeeSalary"
}
export { url }