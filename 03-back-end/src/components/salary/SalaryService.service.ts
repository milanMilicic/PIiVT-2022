import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import EmployeeModel from "../employee/EmployeeModel.model";
import { IAddSalary } from "./dto/IAddSalary.dto";
import SalaryModel from "./SalaryModel.model";

export interface SalaryAdapterOptions extends IAdapterOptions {

}

export default class SalaryService extends BaseService<SalaryModel, SalaryAdapterOptions> {
    tableName(): string {
       return "salary";
    }
    protected async adaptToModel(data: any, options: SalaryAdapterOptions): Promise<SalaryModel> {
        const salary: SalaryModel = new SalaryModel();

        salary.salaryId = +data?.salary_id;
        salary.employeeId = +data?.employee_id;
        salary.monthId = +data?.month_id;

        salary.workHours = +data?.work_hours;
        salary.healthCare = +data?.health_care;
        salary.socialCare = +data?.social_care;
        salary.pio = +data?.pio;
        salary.tax = +data?.tax;
        salary.grossWorth = +data?.gross_worth;
        salary.netWorth = +data?.net_worth;
        

        return salary;
    }


    public async getByMonthId(monthId: number): Promise<SalaryModel[]>{
        return this.getAllByFieldNameAndValue("month_id", monthId, {});
    }

    public async add(data: IAddSalary): Promise<SalaryModel>{
        return this.baseAdd(data, {});
    }
    
}