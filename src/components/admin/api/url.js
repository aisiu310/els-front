const api = "http://192.168.2.231:8088"

const url = {
    //employee 
    employee_getCityURL: api + "/employeeSalary/queryAllDepartment",
    employee_getDeptURL: api + "/organization/queryOrganizationByBelong?belong=",
    employee_addURL: api + "/employee/addEmployee",
    employee_getURL: api + "/employee/queryEmployee",
    employee_reserURL: api + "/employee/modifyEmployeePsd?id=",
    employee_delURL: api + "/employee/modifyEmployeeFake?id=",
}
export { url }