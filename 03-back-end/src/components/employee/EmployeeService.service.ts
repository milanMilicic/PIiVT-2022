import EmployeeModel from './EmployeeModel.model';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import BaseService from '../../common/BaseService';
import { IAddEmployee } from './dto/IAddEmployee.dto';

interface EmployeeAdapteroptions extends IAdapterOptions {

}

export default class EmployeeService extends BaseService<EmployeeModel, EmployeeAdapteroptions>{

    tableName(): string {
        return "employee";
    }

    protected async adaptToModel(data: any): Promise<EmployeeModel>{
        const employee: EmployeeModel = new EmployeeModel();

        employee.employeeId = +data?.employee_id;
        employee.categoryId = +data?.category_id;
        employee.name = data?.name;
        employee.jmbg = data?.jmbg;
        employee.employment = +data?.employment;
        employee.isActive = data?.is_active === 1 ? true : false;


        return employee;
    }


    public async getAllEmployeesByCategoryId(categoryId: number, options: EmployeeAdapteroptions): Promise<EmployeeModel[]>{
        return this.getAllByFieldNameAndValue("category_id", categoryId, options);
    }


    public async add(data: IAddEmployee): Promise<EmployeeModel>{
        return new Promise<EmployeeModel>((resolve, reject) => {
            const sql = "INSERT employee SET name = ?, employment = ?, jmbg = ?, category_id = ?;";

            this.db.execute(sql, [ data.name, data.employment, data.jmbg, data.categoryId ])
            .then(async result => {
                const info: any = result;

                const newEmployeeId = +(info[0]?.insertId);

                const newEmployee: EmployeeModel|null = await this.getById(newEmployeeId, {});

                if(newEmployee === null){
                   return reject({message: "Duplicate jmbg for employee"});
                }

                resolve(newEmployee);
            })
            .catch(error => {
                reject(error);
            })
        })
    }

    
}