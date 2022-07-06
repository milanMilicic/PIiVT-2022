import * as mysql2 from "mysql2/promise";
import IAdapterOptions from "./IAdapterOptions.interface";
import IModel from "./IModel.interface";
import IServiceData from "./IServiceData.interface";

export default abstract class BaseService<ReturnModel extends IModel, AdapterOptions extends IAdapterOptions> {
    private database: mysql2.Connection;

    constructor(databaseConnection: mysql2.Connection){
        this.database = databaseConnection;
    }

    protected get db(): mysql2.Connection{
        return this.database;
    }

    abstract tableName(): string;

    protected abstract adaptToModel(data: any, options: AdapterOptions): Promise<ReturnModel>;


    public getAll(options: AdapterOptions): Promise<ReturnModel[]> {
        const tableName = this.tableName();

        return new Promise<ReturnModel[]>((resolve, reject) => {
            const sql = `SELECT * FROM ${tableName};`;
            
            this.db.execute(sql)
            .then(async ([rows]) => {

                if(rows === undefined){
                    return resolve([]);
                }

                const items: ReturnModel[] = [];

                for(let row of rows as mysql2.RowDataPacket[]){
                    items.push(await this.adaptToModel(row, options));
                }

                resolve(items);
            })
            .catch(error => {
                reject(error);
            });

        });
    }


    public getById(id: number, options: AdapterOptions): Promise<ReturnModel|null>{
        const tableName = this.tableName();

        return new Promise<ReturnModel>((resolve, reject) => {
            const sql = `SELECT * FROM ${tableName} WHERE ${tableName}_id = ?;`;

            this.db.execute(sql, [ id ])
            .then(async ([rows]) => {

                if(rows === undefined){
                    return resolve(null);
                }

                if(Array.isArray(rows) && rows.length === 0){
                    return resolve(null);
                }

                resolve(await this.adaptToModel(rows[0], options));
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    protected async getAllByFieldNameAndValue(fieldName: string, value: any, options: AdapterOptions): Promise<ReturnModel[]>{
        const tableName = this.tableName();

        return new Promise<ReturnModel[]>((resolve, reject) => {
            const sql = `SELECT * FROM ${tableName} WHERE ${fieldName} = ?;`;

            this.db.execute(sql, [ value ])
            .then(async ([rows]) => {

                if(rows === undefined){
                    return resolve([]);
                }

                const items: ReturnModel[] = [];

                for(let row of rows as mysql2.RowDataPacket[]){
                    items.push(await this.adaptToModel(row, options));
                }

                resolve(items);
            })
            .catch(error => {
                reject(error);
            });
        });
    }
    
    protected async baseAdd(data: IServiceData): Promise<ReturnModel>{
        const tableName = this.tableName();
        
        return new Promise<ReturnModel>((resolve, reject) => {
            const sql = "INSERT category SET name = ?, hourly_price = ?;";

            this.db.execute(sql, [ data.name, data.hourlyPrice ])
            .then(async result => {
                const info: any = result;

                const newCategoryId = +(info[0]?.insertId);

                const newCategory: ReturnModel|null = await this.getById(newCategoryId, DefaultCategoryAdapterOptions);

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