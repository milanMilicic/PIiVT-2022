import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import SalaryModel from "../salary/SalaryModel.model";
import CalculationModel from "./CalculationModel.model";
import { IAddCalculation } from "./dto/IAddCalculation.dto";

export interface CalucaltionAdapterOptions extends IAdapterOptions {
    
}

export default class CalculationService extends BaseService<CalculationModel, CalucaltionAdapterOptions>{

    tableName(): string {
       return "calculation";
    }

    protected async adaptToModel(data: any, options: CalucaltionAdapterOptions): Promise<CalculationModel> {
        const calculation: CalculationModel = new CalculationModel();

        calculation.calculationId = +data?.calculation_id;
        calculation.monthId = +data?.month_id;

        calculation.year = +data?.year;
        calculation.healthCare = +data?.health_care;
        calculation.socialCare = +data?.social_care;
        calculation.pio = +data?.pio;
        calculation.tax = +data?.tax;
        calculation.grossWorth = +data?.gross_worth;
        calculation.netWorth = +data?.net_worth;

        return calculation;
    }

    public async getAllByYearNumber(year: number): Promise<CalculationModel[]>{
        return this.getAllByFieldNameAndValue("year", year, {});
    }

    public async getAllByMonthId(monthId: number): Promise<CalculationModel[]>{
        return this.getAllByFieldNameAndValue("month_id", monthId, {});
    }

    public async getByYearAndMonth(year: number, monthId: number): Promise<CalculationModel[]>{
        return this.getAllByFieldNamesAndValues("year", "month_id", year, monthId, {});
    }

    public async addCalculation(data: IAddCalculation): Promise<CalculationModel>{
        return this.baseAdd(data, {});
    }

}