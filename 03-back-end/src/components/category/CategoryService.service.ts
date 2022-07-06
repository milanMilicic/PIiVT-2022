import CategoryModel from './CategoryModel.model';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import EmployeeService from '../employee/EmployeeService.service';
import IAddCategory from './dto/IAddCategory.dto';
import BaseService from '../../common/BaseService';

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
        return new Promise((resolve, reject) => {
            const sql = "INSERT category SET name = ?, hourly_price = ?;";

            this.db.execute(sql, [ data.name, data.hourlyPrice ])
            .then(async result => {
                const info: any = result;

                const newCategoryId = +(info[0]?.insertId);

                const newCategory: CategoryModel|null = await this.getById(newCategoryId, DefaultCategoryAdapterOptions);

                if(newCategory === null){
                   return reject({message: "Duplicate category name"});
                }

                resolve(newCategory);
            })
            .catch(error => {
                reject(error);
            })
        })
    }
}

export { DefaultCategoryAdapterOptions };