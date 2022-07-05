import EmployeeModel from './EmployeeModel.model';
import * as mysql2 from "mysql2/promise";

export default class EmployeeService {
    private db: mysql2.Connection;

    constructor(databaseConnection: mysql2.Connection){
        this.db = databaseConnection;
    }

    private async adapToModel(data: any): Promise<EmployeeModel>{
        const employee: EmployeeModel = new EmployeeModel();

        employee.employeeId = +data?.employee_id;
        employee.categoryId = +data?.category_id;
        employee.name = data?.name;
        employee.employment = +data?.employment;
        employee.isActive = data?.is_active === 1 ? true : false;


        return employee;
    }

    public async getAll(): Promise<EmployeeModel[]>{
        return new Promise<EmployeeModel[]>((resolve, reject) => {
            const sql = "SELECT * FROM employee;";
            
            this.db.execute(sql)
            .then(async ([rows]) => {

                if(rows === undefined){
                    return resolve([]);
                }

                const categories: EmployeeModel[] = [];

                for(let row of rows as mysql2.RowDataPacket[]){
                    categories.push(await this.adapToModel(row));
                }

                resolve(categories);
            })
            .catch(error => {
                reject(error);
            });

        });
    }

    public async getById(employeeId: number): Promise<EmployeeModel|null>{
        return new Promise<EmployeeModel>((resolve, reject) => {
            const sql = "SELECT * FROM employee WHERE employee_id = ?;";

            this.db.execute(sql, [ employeeId ])
            .then(async ([rows]) => {

                if(rows === undefined){
                    return resolve(null);
                }

                if(Array.isArray(rows) && rows.length === 0){
                    return resolve(null);
                }

                resolve(await this.adapToModel(rows[0]));
            })
            .catch(error => {
                reject(error);
            });
        })
    }
    
    public async getEmployeesByCategoryId(categoryId: number): Promise<EmployeeModel[]>{
        return new Promise<EmployeeModel[]>((resolve, reject) => {
            const sql = "SELECT * FROM employee WHERE category_id = ?;";

            this.db.execute(sql, [ categoryId ])
            .then(async ([rows]) => {

                if(rows === undefined){
                    return resolve([]);
                }

                const employees: EmployeeModel[] = [];

                for(let row of rows as mysql2.RowDataPacket[]){
                    employees.push(await this.adapToModel(row));
                }

                resolve(employees);
            })
            .catch(error => {
                reject(error);
            });
        })
    }   
}