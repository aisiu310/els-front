const api = "http://192.168.2.231:8088"

const url = {
    //employee add
    employee_getCityURL: api + "/employeeSalary/queryAllDepartment",
    employee_getDeptURL: api + "/organization/queryOrganizationByBelong?belong=",
    employee_addURL: api + "",
}
export { url }