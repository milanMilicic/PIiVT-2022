import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
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

        salary.year = +data?.year;
        salary.workHours = +data?.work_hours;
        salary.healthCare = +data?.health_care;
        salary.socialCare = +data?.social_care;
        salary.pio = +data?.pio;
        salary.tax = +data?.tax;
        salary.grossWorth = +data?.gross_worth;
        salary.netWorth = +data?.net_worth;
        

        return salary;
    }


    public async getByYearAndMonthId(year: number, monthId: number): Promise<SalaryModel[]>{
        return this.getAllByFieldNamesAndValues("year", "month_id", year, monthId, {});
    }

    public async add(data: IAddSalary): Promise<SalaryModel>{
        return this.baseAdd(data, {});
    }

    public async getAllSalaryByEmployeeId(employeeId: number): Promise<SalaryModel[]>{
        return this.getAllByFieldNameAndValue("employee_id", employeeId, {});
    }
    
}