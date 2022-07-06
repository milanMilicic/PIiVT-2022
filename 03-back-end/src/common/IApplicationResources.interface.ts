import * as mysql2 from "mysql2/promise";
import CategoryService from "../components/category/CategoryService.service";
import EmployeeService from "../components/employee/EmployeeService.service";

export interface IServices {
    category: CategoryService;
    employee: EmployeeService;
}

export default interface IApplicationResources {
    databaseConnection: mysql2.Connection;
    services: IServices;
}