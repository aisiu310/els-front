const salary = 'http://192.168.2.231:8088/'

const url = {
    // salary
    salary_getURL: salary + "SalaryStrategy/queryAllSalaryStrategy",
    salary_updateURL: salary + "SalaryStrategy/modifySalary_Strategy",
    salary_delURL: salary + "SalaryStrategy/removeSalary_Strategy?id="
}
export { url }