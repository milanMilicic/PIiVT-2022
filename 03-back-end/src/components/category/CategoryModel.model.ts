import EmployeeModel from '../employee/EmployeeModel.model';
export default class CategoryModel {
    categoryId: number;
    name: string;
    hourlyPrice: number;

    employees?: EmployeeModel[];
}