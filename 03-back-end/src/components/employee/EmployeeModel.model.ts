import IModel from "../../common/IModel.interface";

export default class EmployeeModel implements IModel {
    employeeId: number;
    categoryId: number;
    name: string;
    jmbg: string;
    employment: number;
    isActive: boolean;
}