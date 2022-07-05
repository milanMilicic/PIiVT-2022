import CategoryModel from './CategoryModel.model';
import * as mysql2 from "mysql2/promise";
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import EmployeeService from '../employee/EmployeeService.service';
import IAddCategory from './dto/IAddCategory.dto';

interface ICategoryAdapterOptions extends IAdapterOptions {
    loadEmployees: boolean;
}

const DefaultCategoryAdapterOptions: ICategoryAdapterOptions = {
    loadEmployees: true,
}

export default class CategoryService {
    private db: mysql2.Connection;

    constructor(databaseConnection: mysql2.Connection){
        this.db = databaseConnection;
    }

    private async adapToModel(data: any, options: ICategoryAdapterOptions = DefaultCategoryAdapterOptions): Promise<CategoryModel>{
        const category: CategoryModel = new CategoryModel();

        category.categoryId = +data?.category_id;
        category.name = data?.name;
        category.hourlyPrice = +data?.hourly_price;

        if(options.loadEmployees){
            const employeeService: EmployeeService = new EmployeeService(this.db);

            category.employees = await employeeService.getEmployeesByCategoryId(category.categoryId);
        }


        return category;
    }

    public async getAll(): Promise<CategoryModel[]>{
        return new Promise<CategoryModel[]>((resolve, reject) => {
            const sql = "SELECT * FROM category ORDER BY hourly_price DESC;";
            
            this.db.execute(sql)
            .then(async ([rows]) => {

                if(rows === undefined){
                    return resolve([]);
                }

                const categories: CategoryModel[] = [];

                for(let row of rows as mysql2.RowDataPacket[]){
                    categories.push(await this.adapToModel(row, {loadEmployees: false},));
                }

                resolve(categories);
            })
            .catch(error => {
                reject(error);
            });

        });
    }

    public async getById(categoryId: number): Promise<CategoryModel|null>{
        return new Promise<CategoryModel>((resolve, reject) => {
            const sql = "SELECT * FROM category WHERE category_id = ?;";

            this.db.execute(sql, [ categoryId ])
            .then(async ([rows]) => {

                if(rows === undefined){
                    return resolve(null);
                }

                if(Array.isArray(rows) && rows.length === 0){
                    return resolve(null);
                }

                resolve(await this.adapToModel(rows[0]));
            })
            .catch(error => {
                reject(error);
            });
        })
    }  
    
    public async add(data: IAddCategory): Promise<CategoryModel>{
        return new Promise((resolve, reject) => {
            const sql = "INSERT category SET name = ?, hourly_price = ?;";

            this.db.execute(sql, [ data.name, data.hourlyPrice])
            .then(result => {

            })
            .catch(error => {
                reject(error);
            })
        })
    }
}