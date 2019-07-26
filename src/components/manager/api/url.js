const api = 'http://192.168.2.231:8088/'

const url = {
    // salary
    salary_getURL: api + "SalaryStrategy/queryAllSalaryStrategy",
    salary_updateURL: api + "SalaryStrategy/modifySalary_Strategy",
    salary_delURL: api + "SalaryStrategy/removeSalary_Strategy?id=",
    // org  rent
    rent_getCityURL: api + "employeeSalary/queryAllDepartment",
    rent_getOrganizationURL: api + "organization/queryOrganizationByBelong?belong=",
    rent_updateRentURL: api + "organization/modifyOrganizationByFinance",
    rent_addOrganizationURL: api + "organization/addOrganization",
    rent_delOrgURL: api + "organization/removeOrganization?id=",
    rent_validId: api + "organization/queryOrganizationById?id="
}
export { url }