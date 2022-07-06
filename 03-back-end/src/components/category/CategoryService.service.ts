import CategoryModel from './CategoryModel.model';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import EmployeeService from '../employee/EmployeeService.service';
import IAddCategory from './dto/IAddCategory.dto';
import BaseService from '../../common/BaseService';
import IEditCategory from './dto/IEditCategory.dto';

interface ICategoryAdapterOptions extends IAdapterOptions {
    loadEmployees: boolean;
}

const DefaultCategoryAdapterOptions: ICategoryAdapterOptions = {
    loadEmployees: true,
}

export default class CategoryService extends BaseService<CategoryModel, ICategoryAdapterOptions> {

    tableName(): string {
        return "category";
    }


    protected async adaptToModel(data: any, options: ICategoryAdapterOptions = DefaultCategoryAdapterOptions): Promise<CategoryModel>{
        const category: CategoryModel = new CategoryModel();

        category.categoryId = +data?.category_id;
        category.name = data?.name;
        category.hourlyPrice = +data?.hourly_price;

        if(options.loadEmployees){
            const employeeService: EmployeeService = new EmployeeService(this.db);

            category.employees = await employeeService.getAllEmployeesByCategoryId(category.categoryId, {});
        }

        return category;
    }

    
    public async add(data: IAddCategory): Promise<CategoryModel>{
        return this.baseAdd(data, {loadEmployees: false});
    }

    public async editById(categoryId: number, data: IEditCategory): Promise<CategoryModel>{
        return this.baseEditById(categoryId, data, { loadEmployees: false });
    }
}

export { DefaultCategoryAdapterOptions };