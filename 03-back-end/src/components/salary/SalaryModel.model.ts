import IModel from '../../common/IModel.interface';

export default class SalaryModel implements IModel {
    salaryId: number;
    employeeId: number;
    monthId: number;

    year: number;
    workHours: number;
    healthCare: number;
    socialCare: number;
    pio: number;
    tax: number;
    grossWorth: number;
    netWorth: number;
}