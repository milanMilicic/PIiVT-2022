import * as mysql2 from "mysql2/promise";
import CategoryService from "../components/category/CategoryService.service";
import EmployeeService from "../components/employee/EmployeeService.service";
import SalaryService from "../components/salary/SalaryService.service";
import UserService from "../components/user/UserService.service";

export interface IServices {
    category: CategoryService;
    employee: EmployeeService;
    user: UserService;
    salary: SalaryService;
}

export default interface IApplicationResources {
    databaseConnection: mysql2.Connection;
    services: IServices;
}