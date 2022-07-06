import IModel from '../../common/IModel.interface';
import EmployeeModel from '../employee/EmployeeModel.model';
export default class CategoryModel implements IModel {
    categoryId: number;
    name: string;
    hourlyPrice: number;

    employees?: EmployeeModel[];
}